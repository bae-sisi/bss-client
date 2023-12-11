import { SearchedSubjectList } from './SearchedSubjectList';

type SearchedSubjectListItemProps = {
  index: number;
  searchedSubject: SearchedSubjectList;
  isSubjectSelected: boolean;
  onClick: () => void;
};

export default function SearchedSubjectListItem({
  index,
  searchedSubject,
  isSubjectSelected,
  onClick,
}: SearchedSubjectListItemProps) {
  return (
    <tr
      onClick={onClick}
      className={`border-b dark:border-gray-700 text-xs text-center cursor-pointer ${
        isSubjectSelected ? 'bg-[#eaf3ff]' : 'hover:bg-gray-50 focus:bg-gray-50'
      }`}
    >
      <th
        scope='row'
        className={`px-4 py-3 font-medium  whitespace-nowrap dark:text-white ${
          isSubjectSelected ? 'text-blue-800' : ''
        }`}
      >
        {index}
      </th>
      <td className={`${isSubjectSelected ? 'text-blue-800' : ''}`}>
        {searchedSubject.grade}학년
      </td>

      <td className={`${isSubjectSelected ? 'text-blue-800' : ''}`}>
        {searchedSubject.lectureName}
      </td>
      <td className={`${isSubjectSelected ? 'text-blue-800' : ''}`}>
        {searchedSubject.profName}
      </td>
    </tr>
  );
}
