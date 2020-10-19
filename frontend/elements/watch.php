<div class="m-auto" style="width: 100%; max-width: 600px">
    <div class="d-flex flex-column align-items-center m-5">
        <form onsubmit="search();return false" action="#" style="width: 100%;">
            <div id="watch-search-container" class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text prepend"></span>
                </div>
                <input type="text" class="form-control movie-search" id="watch-search-input" autocomplete="off" placeholder="Search Watch List">
                <div class="input-group-append">
                    <span id="watch-search-status" onclick="search()" class="input-group-text append btn btn-primary btn-primary-append"><i class="fas fa-search"></i></span>
                </div>
            </div>
        </form>
        <div id="watch-search-feedback" class="mx-2" style="display: block"></div>
        <span class="mr-auto" data-toggle="modal" data-target="#add-movie-watch-modal">
            <button type="button" class="btn btn-primary btn-primary-small mt-3" data-toggle="tooltip" data-placement="bottom" title="Add a movie"><i class="fas fa-plus"></i></button>
        </span>
    </div>
</div>
<!-- Button trigger modal -->

<div id="watch-added-results" class="d-flex flex-wrap justify-content-center">

    <div class="text-center subtext d-flex flex-column align-items-center justify-content-center">Looks like you haven't added any movies to your watch list.    
        <button type="button" class="btn btn-primary mt-3" data-toggle="modal" data-target="#add-movie-watch-modal">Add movie</button>
    </div>

</div>
