export interface Person {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;

  fatherName: string | null;
  fatherSlug: string | null;
  motherName: string | null;
  motherSlug: string | null;
  slug: string;

  mother?: Person;
  father?: Person;
}
