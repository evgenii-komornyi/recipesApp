import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;

            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        if (curPage === 1 && numPages > 1) {
            return this.#generateNextButton(curPage);
        }

        if (curPage === numPages && numPages > 1) {
            return this.#generatePrevButton(curPage);
        }

        if (curPage < numPages) {
            return this.#generatePrevButton(curPage).concat(
                this.#generateNextButton(curPage)
            );
        }

        return '';
    }

    #generatePrevButton(curPage) {
        return `
            <button data-goto="${
                curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
        `;
    }

    #generateNextButton(curPage) {
        return `
            <button data-goto="${
                curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }
}

export default new PaginationView();
