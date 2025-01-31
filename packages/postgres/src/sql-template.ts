import { VercelPostgresError } from './error';

export type Primitive = string | number | boolean | undefined | null;

export function sqlTemplate(
  strings: TemplateStringsArray,
  ...values: Primitive[]
): [string, Primitive[]] {
  if (!Array.isArray(strings)) {
    throw new VercelPostgresError(
      'incorrect_tagged_template_call',
      "It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\n\tExample: sql`SELECT * FROM users`, not sql('SELECT * FROM users')",
    );
  }
  let result = '';

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];

    if (i < values.length) {
      result += `$${i + 1}`;
    }
  }

  return [result, values];
}
