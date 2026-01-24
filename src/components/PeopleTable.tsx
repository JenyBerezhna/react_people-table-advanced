/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types/Person';
import { SortField } from '../types/SortField';

type PeopleTableProps = {
  people: Person[];
  sort: SortField | null;
  order: 'asc' | 'desc' | null;
};

type SortParams = {
  sort: string | null;
  order: 'asc' | 'desc' | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  sort,
  order,
}) => {
  const [searchParams] = useSearchParams();

  const getNextParams = (column: string): SortParams => {
    if (sort !== column) {
      return { sort: column, order: 'asc' };
    }

    if (order === 'asc') {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (column: string): JSX.Element => {
    if (sort !== column) {
      return <i className="fas fa-sort" />;
    }

    if (order === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getNextParams('name')} className="icon ml-1">
                {getSortIcon('name')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextParams('sex')} className="icon ml-1">
                {getSortIcon('sex')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextParams('born')} className="icon ml-1">
                {getSortIcon('born')}
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextParams('died')} className="icon ml-1">
                {getSortIcon('died')}
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr key={person.slug} data-cy="person">
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>{person.motherName || '-'}</td>
            <td>{person.fatherName || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
