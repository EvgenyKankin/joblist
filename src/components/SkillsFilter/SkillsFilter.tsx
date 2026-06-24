import { useState } from 'react';
import { ActionIcon, Pill, PillsInput } from '@mantine/core';

type SkillsFilterProps = {
  skills: string[];
  onChange: (skills: string[]) => void;
};

export const SkillsFilter = ({ skills, onChange }: SkillsFilterProps) => {
  const [value, setValue] = useState('');

  const addSkill = () => {
    const skill = value.trim();

    if (!skill) return;
    if (skills.includes(skill)) return;

    onChange([...skills, skill]);
    setValue('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <PillsInput label="Ключевые навыки">
      <Pill.Group>
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => removeSkill(skill)}
          >
            {skill}
          </Pill>
        ))}

        <PillsInput.Field
          value={value}
          placeholder="Добавить навык"
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addSkill();
            }
          }}
        />

        <ActionIcon
          variant="filled"
          onClick={addSkill}
          aria-label="Добавить навык"
        >
          +
        </ActionIcon>
      </Pill.Group>
    </PillsInput>
  );
};