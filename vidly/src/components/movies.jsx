import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
//import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  /* below function generates list of genres(also add all genres) and set genres list to local state */
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  /* below function delete a movie from the list, pass a movie parametes only and set new list to the state */
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id); //genereating new movies array using filter method
    this.setState({ movies });
  };

  /**below function handle the like event in the list */
  handleLiked = (movie) => {
    const movies = [...this.state.movies]; //get array of movie list
    const index = movies.indexOf(movie); //get index of selected movie
    movies[index] = { ...movies[index] }; //get value from index
    movies[index].liked = !movies[index].liked; //check if it is liked or not
    this.setState({ movies }); //set values to state
  };

  /*below method set the page change event*/
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    /**get below value from state */
    const {
      currentPage,
      pageSize,
      sortColumn,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    /** specify the selected genres*/
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    /**sort column */
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    /**paginate movie list */
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies; /**get movie list lent */
    const { currentPage, pageSize, sortColumn } =
      this.state; /**get this value from local state */
    if (count === 0) {
      return <p>There are no movies in the databases.</p>;
    }

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the databases</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLiked}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
