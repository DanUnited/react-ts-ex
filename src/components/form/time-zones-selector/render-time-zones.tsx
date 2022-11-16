import 'moment-timezone';
import moment from 'moment-timezone';
import Select from 'antd/es/select';

const { Option, OptGroup } = Select;

export function renderTimeZones() {
  const timezones = moment.tz.names();
  const mappedValues: Record<string, string[]> = {};
  const regions: string[] = [];

  timezones.forEach(timezone => {
    const splitTimezone = timezone.split('/');
    const region = splitTimezone[0];

    if (!mappedValues[region]) {
      mappedValues[region] = [];
      regions.push(region);
    }

    mappedValues[region].push(timezone);
  });

  return regions.map(region => {
    const options = mappedValues[region].map(timezone => {
      return <Option key={timezone} value={timezone}>{timezone}</Option>;
    });

    return (
      <OptGroup key={region} title={region}>
        {options}
      </OptGroup>
    );
  });
}
