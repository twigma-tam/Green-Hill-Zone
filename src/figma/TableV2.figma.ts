// url=https://www.figma.com/design/7B95vlwukQ3hKs4G4WH5P5/Green-Hill-Design-System?node-id=24-180
// source=src/components/TableV2.jsx
// component=TableV2
import figma from 'figma'

// TableV2 renders from two props rather than from children: `headers` (string
// or { label, key }) and `dataRows` ({ id, cells[] }). Those shapes are JS data,
// not renderable JSX, so the nested HeaderCell/Row/Cell instances in this
// component can't be composed into the snippet the way Modal composes its
// BigButton children — there's nothing to execute a template *into*. The
// snippet below is a representative call shape instead, matching Dashboard's
// usage (the fully-sortable header shape) rather than mixing it with
// BillingInvoices' plain-string, non-sortable shape.
export default {
  example: figma.code`<TableV2
  headers={[
    { label: 'Customer', key: 'name' },
    { label: 'Plan', key: 'plan' },
    { label: 'MRR', key: 'mrr' },
    { label: 'Status', key: 'status' },
  ]}
  dataRows={dataRows}
  sort={sort}
  onSort={(key, direction) => setSort({ key, direction })}
  selectedId={selectedId}
  onSelect={setSelectedId}
/>`,
  imports: ["import { TableV2 } from '@/components/TableV2.jsx'"],
  id: 'table-v2',
  metadata: { nestable: false },
}
