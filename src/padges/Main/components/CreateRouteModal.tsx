import { ActionIcon, Button, Divider, Group, Modal, Stack, Text } from '@mantine/core';
import { IconCircleMinus, IconPlus } from '@tabler/icons-react';
import { useSettings } from '../../../store/settings';
import { useDetailedHaulingRoutes, useHaulingRoutes } from '../../../store/haulingRoutes';
import { useForm } from '@mantine/form';
import SelectCreatable from '../../../components/SelectCreatable';

interface CreateRouteModal {
  opened: boolean;
  close: () => void;
}

const CreateRouteModal = (props: CreateRouteModal) => {
  const [settings, setSettings] = useSettings();
  const [haulingRoutes, setHaulingRoutes] = useHaulingRoutes();
  const [detailedHaulingRoutes, setDetailedHaulingRoutes] = useDetailedHaulingRoutes();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      origins: [''],
      destinations: [''],
      price: 0,
      scu: 0,
    },
    validate: (values) => {
      let errors: any = null;
      values.origins.forEach((value, index) => {
        if (value.length <= 0) {
          if (!errors) errors = [];
          errors[`origins.${index}`] = true;
        }
      });

      values.destinations.forEach((value, index) => {
        if (value.length <= 0) {
          if (!errors) errors = [];
          errors[`destinations.${index}`] = true;
        }
      });

      return errors;
    },
  });

  const originFields = form.getValues().origins.map((origin, index) => (
    <Group key={'route-origin-' + index} gap={'md'}>
      <SelectCreatable style={{ flex: 1 }} placeholder="Select a origin" {...form.getInputProps(`origins.${index}`)} />
      {index !== 0 ? (
        <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem('origins', index)}>
          <IconCircleMinus />
        </ActionIcon>
      ) : (
        <ActionIcon
          color="gray"
          variant="subtle"
          onClick={() => {
            const value = form.getValues().origins[0];
            if (value.length <= 0) {
              form.setFieldError('origins.0', true);
              return;
            }
            form.setFieldValue('origins.0', '');
            form.insertListItem('origins', value);
          }}
        >
          <IconPlus />
        </ActionIcon>
      )}
    </Group>
  ));

  const destinationFields = form.getValues().destinations.map((destination, index) => (
    <Group key={'route-destination-' + index} gap={'md'}>
      <SelectCreatable
        style={{ flex: 1 }}
        placeholder="Select a destination"
        {...form.getInputProps(`destinations.${index}`)}
      />
      {index !== 0 ? (
        <ActionIcon color="red" variant="subtle" onClick={() => form.removeListItem('destinations', index)}>
          <IconCircleMinus />
        </ActionIcon>
      ) : (
        <ActionIcon
          color="gray"
          variant="subtle"
          onClick={() => {
            const value = form.getValues().destinations[0];
            if (value.length <= 0) {
              form.setFieldError('destinations.0', true);
              return;
            }
            form.setFieldValue('destinations.0', '');
            form.insertListItem('destinations', value);
          }}
        >
          <IconPlus />
        </ActionIcon>
      )}
    </Group>
  ));

  function handleReset() {
    props.close();
    form.reset();
  }

  return (
    <Modal centered={false} opened={props.opened} onClose={handleReset} title={'Create route'}>
      <form
        onSubmit={form.onSubmit((values) => {
          handleReset();
          if (settings.quickMode) {
            setHaulingRoutes([...haulingRoutes, { origin: values.origins, destination: values.destinations }]);
            return;
          } else {
            setDetailedHaulingRoutes([
              ...detailedHaulingRoutes,
              { origin: values.origins, destination: values.destinations, price: values.price, scu: values.scu },
            ]);
          }
        })}
      >
        <Stack gap={'sm'}>
          <Text size="sm" c={'dimmed'}>
            Origin
          </Text>
          {originFields}
          <Divider />
          <Text size="sm" c={'dimmed'}>
            Destination
          </Text>
          {destinationFields}
          {!settings.quickMode && (
            <>
              <Divider />
              <Text c={'dimmed'} size="sm">
                Mission Details
              </Text>
            </>
          )}
          <Button variant="light" size="compact.md" type="submit">
            Add
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateRouteModal;
