

export default function Course({ course }){
  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map(part => {
        return (
          <p key={part.id}>{part.name} {part.exercises}</p>
        )
      })}
      <div>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</div>
    </>
  );
}