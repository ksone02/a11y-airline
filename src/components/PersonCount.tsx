import SpinButton from './SpinButton';

enum PersonKind {
  ADULT = '성인',
  YOUTH = '소아',
  CHILD = '유아',
}

interface SelectPersonKindType {
  label: PersonKind;
  minimum: number;
}

const PersonCount = () => {
  const personKind: SelectPersonKindType[] = [
    {
      label: PersonKind.ADULT,
      minimum: 1,
    },
    {
      label: PersonKind.YOUTH,
      minimum: 0,
    },
    {
      label: PersonKind.CHILD,
      minimum: 0,
    },
  ];

  return (
    <main>
      <header>
        <h1>승객 선택</h1>
      </header>
      <div>
        {personKind.map((kind) => (
          <SpinButton {...kind} />
        ))}
      </div>
    </main>
  );
};

export default PersonCount;
