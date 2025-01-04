import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
} from 'react-native';

// Tạo các chữ cái ngẫu nhiên
const generateRandomLetters = (count: number): string[] => {
  const letters = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    letters.push(alphabet[randomIndex]);
  }
  return letters;
};

// Sinh danh sách letters cho từng câu hỏi
const createShuffledLetters = (
  answer: string,
  extraCount: number,
): string[] => {
  const randomLetters = generateRandomLetters(extraCount);
  const combinedLetters = [...answer, ...randomLetters];
  // Trộn ngẫu nhiên danh sách chữ cái
  return combinedLetters.sort(() => Math.random() - 0.5);
};

const QUESTIONS = [
  {
    image: 'https://via.placeholder.com/150',
    answer: 'VIETNAM',
  },
  {
    image: 'https://via.placeholder.com/150',
    answer: 'FRANCE',
  },
  {
    image: 'https://via.placeholder.com/150',
    answer: 'JAPAN',
  },
];

const QuestionScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const shuffledLetters = createShuffledLetters(currentQuestion.answer, 6); // Thêm 6 chữ cái ngẫu nhiên
    setAvailableLetters(shuffledLetters);
    setSelectedLetters([]);
  }, [currentQuestionIndex]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleSelectLetter = (letter: string, index: number) => {
    if (selectedLetters.length >= currentQuestion.answer.length) return;

    const updatedSelected = [...selectedLetters, letter];
    const updatedAvailable = [...availableLetters];
    updatedAvailable.splice(index, 1);

    setSelectedLetters(updatedSelected);
    setAvailableLetters(updatedAvailable);

    if (updatedSelected.length === currentQuestion.answer.length) {
      const playerAnswer = updatedSelected.join('');
      if (playerAnswer === currentQuestion.answer) {
        Alert.alert('Chính xác!', 'Bạn đã trả lời đúng!', [
          {
            text: 'Tiếp tục',
            onPress: () => {
              if (currentQuestionIndex + 1 < QUESTIONS.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                Alert.alert(
                  'Hoàn thành!',
                  'Bạn đã trả lời xong tất cả câu hỏi!',
                );
              }
            },
          },
        ]);
      } else {
        triggerShakeAnimation();
      }
    }
  };

  const handleDeselectLetter = (index: number) => {
    const updatedSelected = [...selectedLetters];
    const letter = updatedSelected[index];
    const updatedAvailable = [...availableLetters, letter];

    updatedSelected.splice(index, 1);
    setSelectedLetters(updatedSelected);
    setAvailableLetters(updatedAvailable);
  };

  const triggerShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đuổi Hình Bắt Chữ</Text>

      <Image source={{uri: currentQuestion.image}} style={styles.image} />

      <Animated.View
        style={[
          styles.answerContainer,
          {
            transform: [
              {
                translateX: shakeAnimation.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-10, 10],
                }),
              },
            ],
          },
        ]}>
        {Array.from({length: currentQuestion.answer.length}).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDeselectLetter(index)}
            style={styles.answerBox}>
            <Text style={styles.letter}>{selectedLetters[index] || ''}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      <View style={styles.lettersContainer}>
        {availableLetters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectLetter(letter, index)}
            style={styles.letterBox}>
            <Text style={styles.letter}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  answerBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  letterBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#000',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuestionScreen;
