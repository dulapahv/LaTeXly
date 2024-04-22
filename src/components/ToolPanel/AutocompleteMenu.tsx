import { ReactNode } from 'react';

import { BlockMath, InlineMath } from 'react-katex';

import { SymbolsGroup } from '@/constants';
import { TbSelector } from 'react-icons/tb';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  getKeyValue,
  Tooltip,
} from '@nextui-org/react';

interface AutocompleteMenuProps {
  title: string;
  tooltip: ReactNode | string;
  symbolsGroups: SymbolsGroup[];
}

const AutocompleteMenu = ({
  title,
  tooltip,
  symbolsGroups,
}: AutocompleteMenuProps) => {
  const handleInsert = (
    value: string,
    caretPosition: number = value.length
  ) => {
    const editor = document.getElementById('editor') as HTMLTextAreaElement;
    if (!editor) return;

    editor.focus();

    // Insert the symbol at the caret position
    const start = editor.selectionStart;
    // const end = editor.selectionEnd;
    // const textBefore = editor.value.substring(0, start);
    // const textAfter = editor.value.substring(end, editor.value.length);

    // Update the editor value
    // editor.value = textBefore + value + textAfter;
    // setEquation(editor.value);

    // Add value to the browser undo/redo stack
    document.execCommand('insertText', false, value); // TODO: Change to non-deprecated method

    // Move the caret to the caretPosition
    editor.selectionStart = start + caretPosition;
    editor.selectionEnd = start + caretPosition;
  };

  return (
    <div className="flex items-center pl-0.5 pr-1.5">
      <Tooltip
        disableAnimation
        closeDelay={0}
        className="text-xs"
        content={tooltip}
      >
        <Autocomplete
          placeholder={title}
          className="w-52"
          size="sm"
          aria-label={title}
          disableAnimation
          disableSelectorIconRotation
          selectorIcon={<TbSelector />}
          selectedKey={null}
          defaultItems={symbolsGroups}
          onSelectionChange={(symbol) => {
            const symbolValue = getKeyValue(symbol, '');
            handleInsert(symbolValue);
          }}
          scrollShadowProps={{
            isEnabled: false,
          }}
          listboxProps={{
            itemClasses: {
              base: 'text-sm',
            },
          }}
        >
          {(symbolsGroups) => {
            const { title, symbols } = symbolsGroups;

            return (
              <AutocompleteSection
                key={title}
                title={title}
                items={symbols}
                classNames={{
                  heading:
                    'flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small',
                }}
              >
                {symbols.map((symbol) => (
                  <AutocompleteItem
                    key={symbol.value}
                    textValue={symbol.name}
                    value={symbol.value}
                    // classNames={{
                    //   title: 'text-xs',
                    // }}
                  >
                    {symbol.isBlockMath ? (
                      <BlockMath math={symbol.text} />
                    ) : (
                      <InlineMath math={symbol.text} />
                    )}
                  </AutocompleteItem>
                ))}
              </AutocompleteSection>
            );
          }}
        </Autocomplete>
      </Tooltip>
    </div>
  );
};

export default AutocompleteMenu;
