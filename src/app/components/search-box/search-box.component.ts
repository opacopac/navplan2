import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/fromEvent';
import {merge} from 'rxjs/observable/merge';
import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SearchService} from '../../services/search/search.service';
import {ButtonColor, ButtonSize} from '../buttons/button-base.directive';
import {SearchItem, SearchItemList} from '../../model/search-item';
import {DataItem} from '../../model/data-item';
import {Position2d} from '../../model/geometry/position2d';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../../services/session/session.service';
import {Sessioncontext} from '../../model/session/sessioncontext';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


const MIN_QUERY_LENGTH = 3;
const QUERY_DELAY_MS = 250;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;


@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    @Output() dataItemSelected = new EventEmitter<[DataItem, Position2d]>();
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild('searchButton') searchButton: ElementRef;
    public readonly ButtonSize = ButtonSize;
    public readonly ButtonColor = ButtonColor;
    public readonly session: Sessioncontext;
    private readonly searchResultSource: BehaviorSubject<SearchItemList>;
    private readonly selectedIndexSource: BehaviorSubject<number>;
    private searchResultsSubscription: Subscription;
    private selectSearchResultSubscription: Subscription;


    constructor(
        private searchService: SearchService,
        private sessionService: SessionService) {

        this.session = this.sessionService.getSessionContext();
        this.searchResultSource = new BehaviorSubject<SearchItemList>(undefined);
        this.selectedIndexSource = new BehaviorSubject<number>(undefined);
    }


    get searchResults$(): Observable<SearchItemList> {
        return this.searchResultSource.asObservable();
    }


    get selectedIndex$(): Observable<number> {
        return this.selectedIndexSource.asObservable();
    }


    ngOnInit() {
        // subscribe to query input & search button click => execute query
        const mouseClick$ = Observable.fromEvent<MouseEvent>(this.searchButton.nativeElement, 'click');
        const keyboardInput$ = Observable.fromEvent<Event>(this.searchInput.nativeElement, 'input')
            .map(event => (event.target as HTMLInputElement).value);
        this.searchResultsSubscription = merge(keyboardInput$, mouseClick$)
            .withLatestFrom(keyboardInput$)
            .map(([triggerEvent, query]) => query)
            .filter(query => query.trim().length >= MIN_QUERY_LENGTH)
            .debounceTime(QUERY_DELAY_MS)
            .withLatestFrom(this.session.user$)
            .switchMap(([query, user]) => this.searchService.searchByText(query, user))
            .subscribe((searchResults) => {
                this.searchResultSource.next(searchResults);
                this.selectedIndexSource.next(0);
            });


        // subscribe to keyboard events (up, down, enter, esc) => (un)select search result
        this.selectSearchResultSubscription = Observable.fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keydown')
            .map(event => event.keyCode)
            .filter(keyCode => keyCode === UP_KEY_CODE || keyCode === DOWN_KEY_CODE
                || keyCode === ENTER_KEY_CODE || keyCode === ESC_KEY_CODE)
            .withLatestFrom(
                this.searchResults$,
                this.selectedIndex$
            )
            .subscribe(([keyCode, searchResults, selectedIndex]) => {
                this.onKeyDown(keyCode, searchResults, selectedIndex);
            });
    }


    ngOnDestroy() {
        this.searchResultsSubscription.unsubscribe();
        this.selectSearchResultSubscription.unsubscribe();
    }


    public focus() {
        setTimeout(() => this.searchInput.nativeElement.focus(), 0);
    }


    public blur() {
        setTimeout(() => this.searchInput.nativeElement.blur(), 0);
    }


    public clearSearchResults() {
        this.searchResultSource.next(undefined);
        this.selectedIndexSource.next(undefined);
    }


    public onResultSelected(result: SearchItem) {
        this.clearSearchResults();
        this.dataItemSelected.emit([result.dataItem, result.getPosition()]);
    }


    private onKeyDown(keyCode: number, searchResults: SearchItemList, selectedIndex: number) {
        if (!searchResults || searchResults.items.length === 0) {
            return;
        }

        switch (keyCode) {
            case UP_KEY_CODE:
                if (selectedIndex > 0) {
                    this.selectedIndexSource.next(selectedIndex - 1);
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case DOWN_KEY_CODE:
                if (selectedIndex < searchResults.items.length - 1) {
                    this.selectedIndexSource.next(selectedIndex + 1);
                    event.preventDefault();
                    event.stopPropagation();
                }
                break;
            case ENTER_KEY_CODE:
                this.onResultSelected(searchResults.items[selectedIndex]);
                event.preventDefault();
                event.stopPropagation();
                break;
            case ESC_KEY_CODE:
                this.clearSearchResults();
                this.blur();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}
