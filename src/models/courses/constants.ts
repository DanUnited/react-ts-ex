import pick from 'lodash/pick';

import type { ICourse } from 'modules/api-requests/courses/types';

export const defaultCourseUrl = '/images/default-course.png';

export const prepareCourseForUpdate = (course: ICourse) =>
  pick(course, [
    'name',
    'description',
    'yieldActive',
    'weatherActive',
    'city',
    'zip',
    'confirmationEmails',
    'timeZone',
    'address',
    'state',
    'contactPhone',
    'website',
    'subdomain',
    'bestPriceActive',
    'logoUrl',
    'imageUrl',
    'bookingCancellationMsg',
    'welcomeMsg',
    'bookingUnavailableMsg',
    'purchaseConfirmationMsg',
    'lastRoundDiscount',
    'lastRoundDiscountType',
    'taxesAndFeesPerPlayer',
    'subtractFromPrice',
    'roundPrices',
    'publicInfo',
    'isPublicInfoEnabled',
  ]) as ICourse;
