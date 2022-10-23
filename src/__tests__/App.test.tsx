import { screen, render, waitFor, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "App";

const user = userEvent.setup();

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					name: "testChar",
					alternate_names: ["Char0", "Truc machin"],
					house: "Gryffindor",
					wand: { wood: "sapin", core: "plume de pigeon", length: "42" },
					alternate_actors: [],
				},
				...Array(99)
					.fill("")
					.map((_, idx) => ({
						name: `testChar${idx}`,
						alternate_names: [],
					})),
			]),
	})
) as jest.Mock;

test("navigates correctly", async () => {
	render(<App />);

	await waitFor(() => {
		// There should be 20 characters displayed
		expect(screen.getAllByText(/^testChar/)).toHaveLength(20);
	});

	// Buttons for pages 1, 2 and 5 should be displayed
	const pageButtons = screen.getAllByRole("button");
	expect(pageButtons).toHaveLength(3);
	expect(getByText(pageButtons[0], "1"));
	expect(getByText(pageButtons[1], "2"));
	expect(getByText(pageButtons[2], "5"));

	// Page 1 button should be disabled
	expect(pageButtons[0]).toBeDisabled();

	// Click on a character redirects to the details page
	await user.click(screen.getByText("testChar"));
	[
		"testChar",
		"(Also known as: Char0, Truc machin)",
		"Gryffindor",
		"Wood: Sapin",
		"Core: Plume de pigeon",
		"Length: 42",
	].map((text) => expect(screen.getByText(text)).toBeInTheDocument());

	// Go back to front page
	await user.click(screen.getByText(/Back to all characters/));
	expect(screen.getAllByText(/^testChar/)).toHaveLength(20);
});

test("searchbar", async () => {
	render(<App />);

	// Type 'Char0' in the search bar
	userEvent.type(screen.getByRole("textbox"), "Char0");
	await waitFor(() => {
		expect(screen.getAllByText(/^testChar/)).toHaveLength(2);
	});

	// We should have testChar0 and testChar (who has char0 as alternate name)
	expect(screen.getByText("testChar"));
	expect(screen.getByText("testChar0"));

	// Should only have 1 page
	expect(screen.getAllByRole("button")).toHaveLength(1);
});

test("pagination", async () => {
	render(<App />);

	// Go to page 2
	await user.click(screen.getByText("2"));
	expect(screen.getAllByText(/^testChar/)).toHaveLength(20);
	for (let i = 19; i < 39; i++) {
		expect(screen.getByText(`testChar${i}`));
	}
});
