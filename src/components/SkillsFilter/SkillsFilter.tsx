import { useState } from 'react';
import { ActionIcon, Pill, PillsInput } from '@mantine/core';
import classes from './SkillsFilter.module.css'

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
    
    <div className={classes.wrapper}>
      <p className={classes.title}>Ключевые навыки</p>
      <div className={classes.inputContainer}>
          <PillsInput.Field className={classes.input}
            value={value}
            placeholder="Добавить навык"
            style={{
              flex: '0 0 227px',
              width: 227,
              maxWidth: 227,
            }}
            onChange={(event) => setValue(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addSkill();
              }
            }}
          />

        <ActionIcon className = {classes.actionIcon}
          variant="filled"
          onClick={addSkill}
          aria-label="Добавить навык"
        >
        </ActionIcon>
      </div>

      <div className={classes.skillsContainer}>
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => removeSkill(skill)}
          >
            {skill}
          </Pill>
        ))}
      </div>
    </div>
  );
};