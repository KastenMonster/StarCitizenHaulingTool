import { useEffect, useState } from 'react';
import { Combobox, Group, InputBase, MantineStyleProp, Text, useCombobox } from '@mantine/core';
import { useLocations } from '../store/locations';
import { IconCheck, IconFlag } from '@tabler/icons-react';

interface SelectCreatable {
  value?: string | null;
  onChange?: (value: string | null) => void;
  defaultValue?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string | null;
  style?: MantineStyleProp;
  placeholder?: string;
}

const SelectCreatable = (props: SelectCreatable) => {
  const [locations, setLocations] = useLocations();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState(props.value || '');

  useEffect(() => {
    setSearch(props.value || '');
  }, [props.value]);

  const exactOptionMatch = locations.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? locations
    : locations.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item} bg={item === props.value ? 'dark.5' : undefined}>
      <Group gap={'xs'}>
        {item === props.value && <IconCheck size={'.9rem'} />}
        {item}
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      onOptionSubmit={(val) => {
        if (val === '$create') {
          setLocations([...locations, search]);
          props.onChange && props.onChange(search);
          setSearch(search);
        } else {
          props.onChange && props.onChange(val);
          setSearch(val);
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={search}
          style={props.style}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(props.value || '');
          }}
          placeholder={props.placeholder}
          error={props.error}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {locations.length <= 0 && search === '' ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">Create: {search}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default SelectCreatable;
