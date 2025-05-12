import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Quote,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface RichTextEditorProps {
  value: string;
  onChange: (text: string) => void;
  colorScheme?: 'light' | 'dark' | null;
}

// Helper to safely get theme colors
const getTheme = (scheme: 'light' | 'dark' | null | undefined) =>
  Colors[scheme === 'dark' ? 'dark' : 'light'];

export default function RichTextEditor({
  value,
  onChange,
  colorScheme,
}: RichTextEditorProps) {
  const theme = getTheme(colorScheme);

  const handleFormatText = (format: string) => {
    const formatMap = {
      bold: '**Bold text** ',
      italic: '*Italic text* ',
      underline: '_Underlined text_ ',
      align: 'Aligned text ',
      list: '- List item\n- Another item\n',
      quote: '> Quoted text\n',
    };

    onChange(value + (formatMap[format as keyof typeof formatMap] || ''));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.toolbar, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('bold')}
        >
          <Bold size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('italic')}
        >
          <Italic size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('underline')}
        >
          <Underline size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('align')}
        >
          <AlignLeft size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('align')}
        >
          <AlignCenter size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('align')}
        >
          <AlignRight size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('list')}
        >
          <List size={20} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => handleFormatText('quote')}
        >
          <Quote size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.editorContainer}>
        <TextInput
          style={[
            styles.editor,
            {
              color: theme.text,
              backgroundColor: theme.background,
            },
          ]}
          multiline
          value={value}
          onChangeText={onChange}
          placeholder="Begin your story here..."
          placeholderTextColor={theme.textSecondary}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  toolbarButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  editorContainer: {
    flex: 1,
  },
  editor: {
    flex: 1,
    fontFamily: 'Merriweather-Regular',
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    minHeight: 300,
  },
});
