import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const usePeople = (mockData?: Person[]) => {
  const [people, setPeople] = useState<Person[]>(mockData || []);
  const [loading, setLoading] = useState(!mockData); // loading only if no mock
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

  return { people, loading, error };
};
