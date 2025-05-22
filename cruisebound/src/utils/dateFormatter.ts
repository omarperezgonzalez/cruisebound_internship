export function dateFormatter(startDate : string, endDate : string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Month names array
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    
    const startMonth = months[start.getMonth()];
    const startDay = start.getDate();
    const startYear = start.getFullYear();
    
    const endMonth = months[end.getMonth()];
    const endDay = end.getDate();
    const endYear = end.getFullYear();
    
    // Same year and same month
    if (startYear === endYear && start.getMonth() === end.getMonth()) {
      return `${startMonth} ${startDay}-${endDay}, ${startYear}`;
    }
    
    // Same year, different months
    if (startYear === endYear) {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
    }
    
    // Different years
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
  }