export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export function formatDateTime(input: string): string {
  // 입력된 문자열을 Date 객체로 변환
  const date = new Date(input);

  // toLocaleString을 사용하여 원하는 형식으로 변환
  // 옵션을 조정하여 날짜와 시간 형식을 지정
  const formattedDate = date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24시간 형식
  });

  return formattedDate.replace(
    /(\d{4})\. (\d{2})\. (\d{2})\. (\d{2}):(\d{2})/,
    '$1.$2.$3 $4:$5'
  );
}

export interface TimeDifference {
  isPast: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeDifference(endDate: string): TimeDifference {
  const now = new Date();
  const end = new Date(endDate);
  const difference = end.getTime() - now.getTime();

  const isPast = difference < 0;
  const absDifference = Math.abs(difference);

  const days = Math.floor(absDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((absDifference / 1000) % 60);

  return {
    isPast,
    days,
    hours,
    minutes,
    seconds,
  };
}
