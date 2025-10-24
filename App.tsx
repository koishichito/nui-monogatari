import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import GameScreen from './components/GameScreen';
import ChoiceButton from './components/ChoiceButton';
import StatusBar from './components/StatusBar';
import { GameState, Companion, StoryChoice, EndingType } from './types';
import { STATUES, INITIAL_POINTS, POINTS_THRESHOLD_GOOD, POINTS_THRESHOLD_NEUTRAL } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [points, setPoints] = useState<number>(INITIAL_POINTS);
  const [storyLog, setStoryLog] = useState<string[]>([]);
  const [choices, setChoices] = useState<StoryChoice[]>([]);
  const [companion, setCompanion] = useState<Companion>('none');
  const [currentStatueIndex, setCurrentStatueIndex] = useState<number>(0);
  const [endingType, setEndingType] = useState<EndingType>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Parallax effect for the background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mainRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30; // 30px max offset
      const y = (clientY / innerHeight - 0.5) * 30;
      mainRef.current.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const addStory = useCallback((text: string) => {
    setStoryLog(prev => [...prev, text]);
  }, []);

  const restartGame = () => {
    setGameState('start');
    setPoints(INITIAL_POINTS);
    setStoryLog([]);
    setChoices([]);
    setCompanion('none');
    setCurrentStatueIndex(0);
    setEndingType(null);
  };

  const handleChoice = (choiceId: string) => {
    setChoices([]); // Clear choices after one is made
    switch (gameState) {
      case 'start':
        handleRestaurantChoice(choiceId);
        break;
      case 'vtuber_end_scene':
        startStatueTour();
        break;
      case 'statue_tour':
        handleStatueChoice(choiceId);
        break;
    }
  };
  
  const handleRestaurantChoice = (choiceId: string) => {
    if (choiceId === 'aria') {
      addStory("櫻子は話しかけた。「ありあ？ 歌と踊りが得意なありあだよね？高校の同級生だったよね？久しぶり。」");
      addStory("ありあ「わあ、懐かしい。久しぶりね。」二人はしばらく近況報告を交わした。");
      addStory("櫻子はありあを誘った。「私、今から銅像めぐりに行くの。ご一緒にいかが？」");
      addStory("ありあ「もちろん喜んで。あなたについて行くわ。」");
      addStory("【ポイントが5上がった】");
      setPoints(p => p + 5);
      setCompanion('aria');
      setTimeout(startStatueTour, 1000);
    } else if (choiceId === 'stranger') {
      addStory("知り合いかな？と思ったが、見知らぬ人だった。");
      setTimeout(startStatueTour, 1000);
    } else if (choiceId === 'vtuber') {
      addStory("そこには有名なVtuber「歌譜」ちゃんがいた。顔出しはしていないが、メニューを注文する声でわかった。");
      addStory("「失礼します、あなたは「歌譜」ちゃんですか？ファンなんです。」思い切って声をかけると、少し驚いたようだったが、「そうです。」と答えてくれた。");
      addStory("サインを思い切ってお願いすると、快くサインがもらえた。");
      setGameState('vtuber_end_scene');
    }
  };

  const startStatueTour = () => {
    setStoryLog([]);
    if(companion === 'aria'){
      addStory("ありあと一緒に銅像めぐりを始めた。");
    } else {
      addStory("一人でキャンパスの銅像めぐりを始めた。");
    }
    setGameState('statue_tour');
    setCurrentStatueIndex(0);
  };

  const handleStatueChoice = (choiceId: string) => {
    if (choiceId === 'offer_cookie') {
      addStory("ミルククッキーをお供えした。銅像が微笑んだ気がした。");
      addStory("【ポイントが2上がった】");
      setPoints(p => p + 2);
    } else {
      addStory("次の場所へ向かうことにした。");
    }
    
    const nextIndex = currentStatueIndex + 1;
    if (nextIndex < STATUES.length) {
      setCurrentStatueIndex(nextIndex);
    } else {
      // End of tour
      setTimeout(triggerEnding, 1500);
    }
  };

  const triggerEnding = () => {
      setGameState('ending');
      if (points > POINTS_THRESHOLD_GOOD) {
          setEndingType('good');
      } else if (points > POINTS_THRESHOLD_NEUTRAL) {
          setEndingType('neutral');
      } else {
          setEndingType('bad');
      }
  };
  
  useEffect(() => {
    if (gameState === 'start') {
      addStory("大学図書館に勤務する櫻子。キャンパスの池畔にあるレストランのテーブルに腰掛け、料理を待っていた。");
      addStory("「四月に来たものの、周りは偉い方々ばかりで圧倒されるな...。仲良くしてくれるのは誰だろう。」そばにはお気に入りのぬいぐるみがいる。");
      addStory("ふと、奇麗な女性が現れた。");
      setChoices([
        { text: "昔の知り合いで、歌と踊りが上手だった。", id: 'aria' },
        { text: "全く知らない人だった。", id: 'stranger' },
        { text: "日本のVtuberだった。", id: 'vtuber' }
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState === 'start']);

  useEffect(() => {
    if (gameState === 'vtuber_end_scene') {
        setChoices([{ text: "満足して、銅像めぐりを始めよう。", id: 'continue' }]);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'statue_tour' && currentStatueIndex < STATUES.length) {
      const currentStatue = STATUES[currentStatueIndex];
      addStory(`【${currentStatue.name}】`);
      addStory(currentStatue.description);
      if(companion === 'aria') {
        addStory("ありあ「素敵な像ね。歴史を感じるわ。」");
      }
      setChoices([
        { text: "ミルククッキーをお供えする", id: 'offer_cookie' },
        { text: "次へ進む", id: 'move_on' },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, currentStatueIndex]);

  useEffect(() => {
    if (gameState === 'ending') {
      setStoryLog([]);
      if (endingType === 'good') {
        addStory("銅像めぐりを終えた瞬間、本郷キャンパスがまばゆい光に包まれた。");
        addStory("目の前には、見たこともない美しい庭園が広がっていた。櫻子の新しい生活が、輝き始めた。");
        if(companion === 'aria'){
          addStory("ありあ「すごい...！あなたといると、不思議なことが起こるのね。」二人は微笑み合った。");
        }
      } else if (endingType === 'neutral') {
        addStory("銅像めぐりを終えた。キャンパスの歴史に触れ、少しだけこの場所に馴染めた気がする。");
        addStory("明日からも、また頑張ろう。櫻子は静かに心に誓った。");
        if(companion === 'aria'){
          addStory("ありあ「楽しかったわ。また一緒にどこか行きましょうね。」");
        }
      } else { // bad
        addStory("銅像めぐりを終えたが、心は晴れないままだった。");
        addStory("広いキャンパスに一人、櫻子は寂しさを感じていた。お気に入りのぬいぐるみを、ぎゅっと抱きしめた。");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endingType]);

  const getBackgroundImage = () => {
    if (gameState === 'ending' && endingType === 'good') return 'https://picsum.photos/seed/garden/1920/1080';
    return './tpo-chart.jpg';
  };

  const getSceneImage = () => {
    if (gameState === 'statue_tour' && STATUES[currentStatueIndex]) {
        return STATUES[currentStatueIndex].image;
    }
     if (gameState === 'ending' && endingType === 'good') {
        return 'https://picsum.photos/seed/magic/800/600';
    }
    return 'https://picsum.photos/seed/restaurant/800/600';
  }

  return (
    <main ref={mainRef} className="w-full h-screen bg-cover bg-center flex items-center justify-center p-4 font-sans transition-all duration-300" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <StatusBar points={points} companion={companion} />

        <GameScreen storyLog={storyLog} imageSrc={getSceneImage()} gameState={gameState}>
            {gameState !== 'ending' && choices.map(choice => (
                <ChoiceButton key={choice.id} onClick={() => handleChoice(choice.id)}>
                    {choice.text}
                </ChoiceButton>
            ))}
            {gameState === 'ending' && (
                <ChoiceButton onClick={restartGame}>
                    もう一度プレイする
                </ChoiceButton>
            )}
        </GameScreen>
    </main>
  );
};

export default App;