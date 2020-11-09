<div class="m-auto" style="width: 100%; max-width: 600px">
    <div class="d-flex flex-column align-items-center tab-action-container">
        <form onsubmit="search('search-watch', 'watch');return false" action="#" style="width: 100%;">
            <div id="watch-search-container" class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text prepend"></span>
                </div>
                <input type="text" class="form-control movie-search" id="watch-search-input" autocomplete="off" placeholder="Search Watch List">
                <div class="input-group-append">
                    <button id="watch-search-status" type="submit" class="input-group-text append btn btn-primary btn-primary-append"><i class="fas fa-search"></i></button>
                </div>
            </div>
        </form>
        <div id="watch-search-feedback" class="mx-2 hidden" style="display: block"></div>
        <div class="d-flex" style="width: 100%">
            <span class="mr-auto" data-toggle="modal" data-target="#add-movie-watch-modal">
                <button type="button" class="btn btn-primary btn-primary-small mt-3" data-toggle="tooltip" title="Add a movie"><i class="fas fa-plus"></i></button>
            </span>
            <span id="watch-clear-search" class="mx-2 ml-auto"></span>
        </div>
    </div>
</div>
<!-- Button trigger modal -->

<div id="watch-results-category" class="d-flex flex-wrap justify-content-center"></div>
<div id="watch-results-container" class="d-flex flex-wrap justify-content-center">

    <div class="text-center subtext d-flex flex-column align-items-center justify-content-center">
        <span>Loading</span>
        <span><i class="fas fa-spinner fa-spin"></i></span>
        <span class="font-italic" style="font-size: smaller">Not loading? Try <a href="" onclick="reload()" class="text-decoration-none">reloading</a> the page</span>
    </div>

</div>

<?php?>