<div class="m-auto" style="width: 100%; max-width: 600px">
    <div class="d-flex flex-column align-items-center m-5">
        <form onsubmit="search('search-watched', 'watched');return false" action="#" style="width: 100%;">
            <div id="watched-search-container" class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text prepend"></span>
                </div>
                <input type="text" class="form-control movie-search" id="watched-search-input" autocomplete="off" placeholder="Search watched List">
                <div class="input-group-append">
                    <button id="watched-search-status" type="submit" class="input-group-text append btn btn-primary btn-primary-append"><i class="fas fa-search"></i></button>
                </div>
            </div>
        </form>
        <div id="watched-search-feedback" class="mx-2 hidden" style="display: block"></div>
        <div class="d-flex" style="width: 100%">
            <span class="mr-auto" data-toggle="modal" data-target="#add-movie-watched-modal">
                <button type="button" class="btn btn-primary btn-primary-small mt-3" data-toggle="tooltip" title="Add a movie"><i class="fas fa-plus"></i></button>
            </span>
            <span id="watched-clear-search" class="mx-2 ml-auto"></span>
        </div>
    </div>
</div>
<!-- Button trigger modal -->

<div id="watched-results-category" class="d-flex flex-wrap justify-content-center"></div>
<div id="watched-results-container" class="d-flex flex-wrap justify-content-center">

    <div class="text-center subtext d-flex flex-column align-items-center justify-content-center">Loading    
        <span><i class="fas fa-spinner fa-spin"></i></span>
    </div>

</div>

<?php?>