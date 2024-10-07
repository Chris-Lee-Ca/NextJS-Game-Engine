export type KeyboardKey =
// Modifier Keys
| 'Shift'
| 'Control'
| 'Alt'
| 'Meta'

// Alphabet Keys
| 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
| 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

// Number Keys
| '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

// Function Keys
| 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12'

// Arrow Keys
| 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

// Navigation Keys
| 'Enter' | 'Space' | 'Tab' | 'Escape' | 'Backspace' | 'Delete' | 'Insert'
| 'Home' | 'End' | 'PageUp' | 'PageDown'

// Numpad Keys
| 'Numpad0' | 'Numpad1' | 'Numpad2' | 'Numpad3' | 'Numpad4' | 'Numpad5'
| 'Numpad6' | 'Numpad7' | 'Numpad8' | 'Numpad9' | 'NumpadDecimal'
| 'NumpadDivide' | 'NumpadMultiply' | 'NumpadSubtract' | 'NumpadAdd' | 'NumpadEnter'

// Symbols & Punctuation Keys
| ';' | ':' | '\'' | '"' | ',' | '.' | '/' | '\\' | '[' | ']' | '-' | '=' | '!'
| '@' | '#' | '$' | '%' | '^' | '&' | '*' | '(' | ')' | '_' | '+'

// Media Keys
| 'MediaPlayPause' | 'MediaStop' | 'MediaTrackNext' | 'MediaTrackPrevious'
| 'VolumeUp' | 'VolumeDown' | 'VolumeMute'

// Lock Keys
| 'CapsLock' | 'NumLock' | 'ScrollLock'

// Special Keys
| 'ContextMenu' | 'PrintScreen' | 'Pause' | 'Break';
