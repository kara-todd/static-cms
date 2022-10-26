import { keyToPathArray } from '../widgets/stringTemplate';

import type { t } from 'react-polyglot';
import type { Collection, Field } from '../../interface';

export function selectField(collection: Collection, key: string) {
  const array = keyToPathArray(key);
  let name: string | undefined;
  let field;
  let fields = collection.fields ?? [];
  while ((name = array.shift()) && fields) {
    field = fields.find(f => f.name === name);
    if (field) {
      if ('fields' in field) {
        fields = field?.fields ?? [];
      } else if ('types' in field) {
        fields = field?.types ?? [];
      }
    }
  }

  return field;
}

export function getFieldLabel(field: Field, t: t) {
  return `${field.label ?? field.name} ${`${
    field.required === false ? ` (${t('editor.editorControl.field.optional')})` : ''
  }`}`;
}