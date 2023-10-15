type SearchedSubjectListItemProps = {
  isSelected: boolean;
  onClick: () => void;
};

export default function SearchedSubjectListItem({
  isSelected,
  onClick,
}: SearchedSubjectListItemProps) {
  return (
    <tr
      onClick={onClick}
      className={`border-b dark:border-gray-700 text-xs text-center cursor-pointer ${
        isSelected ? 'bg-[#eaf3ff]' : 'hover:bg-gray-50 focus:bg-gray-50'
      }`}
    >
      <th
        scope='row'
        className={`px-4 py-3 font-medium  whitespace-nowrap dark:text-white ${
          isSelected ? 'text-blue-800' : ''
        }`}
      >
        1
      </th>
      <td className={`${isSelected ? 'text-blue-800' : ''}`}>3학년</td>
      <td className={`${isSelected ? 'text-blue-800' : ''}`}>전공선택</td>
      <td className={`${isSelected ? 'text-blue-800' : ''}`}>
        데이터베이스시스템
      </td>
      <td className={`${isSelected ? 'text-blue-800' : ''}`}>01</td>
      <td className={`${isSelected ? 'text-blue-800' : ''}`}>3</td>
      <td className={`${isSelected ? 'text-blue-800' : ''}`}>아지즈</td>
      <td className={`${isSelected ? 'text-blue-800' : ''}`}>
        화 08 ,09 [S4-1-104(21-104)] 목 07 ,08 [S4-1-206(21-206)]
      </td>
    </tr>
  );
}
