import { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const usePeople = (mockData?: Person[]) => {
  const [people, setPeople] = useState<Person[]>(mockData || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (mockData) {
      return;
    }

    setLoading(true);
    setError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [mockData]);

  const normalizedPeople = useMemo(() => {
    return people.map(person => ({
      ...person,
      mother: people.find(p => p.slug === person.motherSlug),
      father: people.find(p => p.slug === person.fatherSlug),
    }));
  }, [people]);

  return { people: normalizedPeople, loading, error };
};
