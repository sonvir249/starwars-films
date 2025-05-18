import { waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import MoviesWrapper from "./MoviesWrapper";
import { MoviesState } from "../../types/movie";

test("Should display movie data when provided", async () => {
  const mockMovies = [
    {
      title: "A New Hope",
      episode_id: 4,
      opening_crawl:
        "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: "George Lucas",
      producer: "Gary Kurtz, Rick McCallum",
      release_date: "1977-05-25",
    },
    {
      title: "The Empire Strikes Back",
      episode_id: 5,
      opening_crawl:
        "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
      director: "Irvin Kershner",
      producer: "Gary Kurtz, Rick McCallum",
      release_date: "1980-05-17",
    },
  ];

  const intialMovies: MoviesState = {
    movies: mockMovies,
    sortedMovies: mockMovies,
    status: "succeeded",
    error: null,
  };

  const { getByText } = renderWithProviders(<MoviesWrapper />, {
    preloadedState: {
      movies: intialMovies,
    },
  });
  await waitFor(
    () => {
      expect(getByText("A New Hope")).toBeInTheDocument();
      expect(getByText("The Empire Strikes Back")).toBeInTheDocument();
    },
    { timeout: 2000 }
  );
});

test("Should display all movies", async () => {
  const { getByText } = renderWithProviders(<MoviesWrapper />);
  await waitFor(
    () => {
      expect(getByText("A New Hope")).toBeInTheDocument();
      expect(getByText("The Empire Strikes Back")).toBeInTheDocument();
    },
    { timeout: 5000 }
  );
});

test("Should display loading screen", async () => {
  const { getByText } = renderWithProviders(<MoviesWrapper />);
  expect(getByText("Loading...")).toBeInTheDocument();
});
