import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import { LoadingStatusEnum } from 'models/types';
import { asyncDebounce } from 'utils/async-debounce';
import { getFilters } from '../table-meta/selectors';
import { PathCreator, RoutePaths } from 'routing/constants';
import { isPendingAction, returnPaginationRequest } from '../helpers';
import { getCourseReservationRequest } from 'modules/api-requests/reservations';
import { DateFormat, DateTimeFormat, ServerTimeFormat, TimeFormat } from 'utils/date';

import type {
  ICourseReservation,
  ICourseReservationRequest,
  ICourseReservationFilter,
} from 'modules/api-requests/reservations/types';
import type { RootState } from 'modules/store/types';

const pagePath = PathCreator[RoutePaths.RESERVATIONS_LIST].path;

const fetchReservationHandler = asyncDebounce(({ courseId }: { courseId: string, timeZone: string }, thunkAPI) => {
  const { search } = getFilters(thunkAPI.getState() as RootState)(pagePath) as ICourseReservationFilter;

  return returnPaginationRequest<ICourseReservation[], ICourseReservationRequest>({
    asyncRequest: (params) => getCourseReservationRequest({ ...params, search: search || undefined }),
    thunkAPI,
    pagePath,
    asyncRequestParams: { courseId },
  });
}, 250);

export const fetchCourseReservationAction = createAsyncThunk(
  'reservations/get',
  fetchReservationHandler
);

interface ICourseReservationItem extends Omit<ICourseReservation, 'players'> {
  players: number;
  teeTimeDate: string;
}

interface ICourseReservationState {
  items: ICourseReservationItem[];
  loading: LoadingStatusEnum;
  error: unknown;
}

const courseReservationsInitState: ICourseReservationState = {
  items: [],
  loading: LoadingStatusEnum.IDLE,
  error: undefined,
};

export const courseReservationsReducer = createReducer(
  courseReservationsInitState,
  (builder) => {
    builder
      .addCase(fetchCourseReservationAction.rejected, (state, { payload }) => {
        return {
          ...state,
          items: [],
          loading: LoadingStatusEnum.FAILED,
          error: payload,
        };
      })
      .addCase(fetchCourseReservationAction.fulfilled, (state, { payload, meta }) => {
        if (!payload) return {
          ...state,
          items: [],
          loading: LoadingStatusEnum.SUCCESS,
        };

        return {
          items: payload.map(item => ({
            ...item,
            players: item.players?.length || 1,
            userCreated: item.players
              ?.map(player => {
                return player.firstName === null
                  ? 'Guest'
                  : `${player.firstName} ${player.lastName || ''}`.trim();
              })
              ?.join(', ') || 'Guest',
            createdAt: momentTimezone.utc(item.createdAt).tz(meta.arg.timeZone).format(DateTimeFormat),
            teeTimeDate: `${moment.utc(item.date).format(DateFormat)} ${moment(item.startTime, ServerTimeFormat).format(TimeFormat)}`,
          })),
          error: undefined,
          loading: LoadingStatusEnum.SUCCESS,
        };
      })
      .addMatcher(isPendingAction, (state) => ({
        ...state,
        loading: LoadingStatusEnum.LOADING,
      }));
  },
);
