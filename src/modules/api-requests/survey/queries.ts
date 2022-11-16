import { useMutation, UseMutationOptions, useQuery } from 'react-query';

import { queryOptions } from '../constants';
import { createSurveyRequest, getAllSurveysRequest, updateSurveyRequest, updateSurveyStatusRequest } from './index';

import type { UseQueryOptions } from 'react-query';
import type { ISurvey, ISurveySubmittedMeta } from './types';

export function useSurveyList(
  courseId?: string,
  options?: UseQueryOptions<ISurvey[], string, ISurvey[]>,
) {
  return useQuery(
    {
      queryKey: ['getSurveys', courseId],
      enabled: Boolean(courseId),
      initialData: [] as ISurvey[],
      queryFn: () => courseId ? getAllSurveysRequest({ courseId }) : Promise.reject(),
      ...queryOptions,
      ...options,
    },
  );
}

interface IUpdateSurveyMutationFn {
  surveyId: string,
  data: ISurvey & ISurveySubmittedMeta
}

export function useUpdateSurveyMutation(
  courseId?: string,
  options?: UseMutationOptions<ISurvey, string, IUpdateSurveyMutationFn>,
) {
  return useMutation(
    {
      mutationKey: ['updateSurvey', courseId],
      mutationFn: ({ surveyId, data }: IUpdateSurveyMutationFn) => courseId && surveyId
        ? updateSurveyRequest({ courseId, surveyId, data })
        : Promise.reject('Unable to update survey'),
      ...options,
    },
  );
}

export function useCreateSurveyMutation(
  courseId?: string,
  options?: UseMutationOptions<ISurvey, string, ISurvey & ISurveySubmittedMeta>,
) {
  return useMutation(
    {
      mutationKey: ['createSurvey', courseId],
      mutationFn: (data: ISurvey & ISurveySubmittedMeta) => courseId
        ? createSurveyRequest({ courseId, data })
        : Promise.reject('Unable to create survey'),
      ...options,
    },
  );
}

interface IUpdateStatusSurveyMutationFn {
  surveyId: string,
  isActive: boolean,
}

export function useUpdateStatusSurveyMutation(
  courseId?: string,
  options?: UseMutationOptions<ISurvey, string, IUpdateStatusSurveyMutationFn>,
) {
  return useMutation(
    {
      mutationKey: ['updateStatusSurvey', courseId],
      mutationFn: ({ surveyId, isActive }: IUpdateStatusSurveyMutationFn) => courseId && surveyId
        ? updateSurveyStatusRequest({ courseId, surveyId, isActive })
        : Promise.reject('Unable to update status of survey'),
      ...options,
    },
  );
}
