import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieCard from "@/components/MovieCard";

describe("MovieCard", () => {
  it("should renders a movie card component", () => {
    render(<MovieCard />);
    const movieCard = screen.getByRole("heading");
    expect(movieCard).toBeInTheDocument();
  });
});
