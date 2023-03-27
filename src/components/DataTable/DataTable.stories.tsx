import { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

const meta = {
  title: 'Data table',
  component: DataTable,
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <DataTable />,
};
