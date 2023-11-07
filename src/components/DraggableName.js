import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableName = () => {
  const [, ref] = useDrag({
    type: 'NAME',
    item: { name: 'Eberty' },
  });

  return (
    <div ref={ref} className="bg-gray-500 text-white font-semibold p-2 cursor-pointer">
      Eberty
    </div>
  );
};

export default DraggableName;
