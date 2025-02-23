import { useState } from 'react';
import { hiragana } from './kana';

function App() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<Set<string>>(new Set());

  // Toggles the selection state of an entire row (sound). 
  // Adds or removes the row from selectedRows and updates all corresponding character selections in selectedChars accordingly.
  const toggleRow = (sound: string, chars: string[]) => {
    setSelectedRows((prev) =>
      prev.includes(sound)
        ? prev.filter((s) => s !== sound)
        : [...prev, sound]
    );

    setSelectedChars((prevChars) => {
      const updatedChars = new Set(prevChars);
      chars.forEach((char) => {
        if(!char) return;
        if(selectedRows.includes(sound)) {
          updatedChars.delete(char);
        }else{
          updatedChars.add(char)
        }
      });
      return updatedChars
    })
  };
  
  // Toggles the selection state of a single character.
  // Adds the character to selectedChars if it's not already selected, or removes it if it's already selected.
  const toggleChar = (char: string) => {
    setSelectedChars((prevChars) => {
      const updatedChars = new Set(prevChars);
      if(updatedChars.has(char)){
        updatedChars.delete(char);
      }else{
        updatedChars.add(char);
      }
      return updatedChars;
    })
  }

  return (
    <div className="p-10 bg-neutral-900 min-h-screen text-white flex flex-col gap-6">
      <div className='max-w-7xl mx-auto flex flex-row gap-10 justify-center py-20'>

      {/* Hiragana section */}
      <div className='flex-1 flex flex-col items-center gap-6'>
      <h1 className='text-white font-bold text-3xl text-center'>平仮名<br />Hiragana</h1>
      {hiragana.map(({ sound, chars }) => (
        <div key={sound} className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer w-24">
            <input
              type="checkbox"
              checked={selectedRows.includes(sound)}
              onChange={() => toggleRow(sound, chars)}
              className="mr-2 cursor-pointer"
            />
            <span>{sound === 'ん' ? 'ん' : ''}</span>
          </label>

          <div className="flex gap-2">
            {chars.map((char, idx) =>
              char ? (
                <button
                  key={idx}
                  onClick={() => toggleChar(char)}
                  className={`text-2xl rounded-lg border-2 px-4 py-2 transition duration-300 ease-in-out
                    ${
                      selectedChars.has(char)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                  {char}
                </button>
              ) : (
                <div
                  key={idx}
                  className="px-4 py-2 opacity-20 bg-neutral-800 rounded-lg"
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Katana Section */}
    <div className='flex-1 flex flex-col items-center gap-6'>
      <h1 className='text-white font-bold text-3xl text-center'>片仮名<br />Katakana</h1>
    </div>
    </div>
    </div>
  );
}

export default App;
