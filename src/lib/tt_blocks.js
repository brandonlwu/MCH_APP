import {getProcessedData} from '../store';

var _ = require('lodash');
const config = require('../config');

export function create_blocks(c25, c50, c75) {
  // Creates arrays in the form of:
  //  [0,...,0,c25,...,c25,c50,...,c50,c75,...,c75]
  // where the number of each values is passed in as an arg.
  function create_block(num_zero, num_c25, num_c50, num_c75) {
    return _.flatten([
      _.fill(Array(num_zero), 0),
      _.fill(Array(num_c25), c25),
      _.fill(Array(num_c50), c50),
      _.fill(Array(num_c75), c75)
    ]);
  }

  let blocks;
  if (config.debug) {
    blocks = [
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
      create_block(1,1,1,0),
    ];
  } else {
    blocks = [
      // First block has first 8 fixed at c75
      _.concat(_.fill(Array(5), c75), _.shuffle(create_block(1, 1, 0, 4))),
      create_block(1, 0, 1, 2),
      create_block(2, 1, 1, 2),
      create_block(3, 1, 2, 1),
      create_block(3, 2, 1, 1),
      create_block(3, 2, 1, 1),
      create_block(3, 2, 2, 0),
      create_block(3, 2, 1, 1),
      create_block(3, 2, 2, 0),
      create_block(3, 2, 2, 1),
      create_block(3, 1, 2, 0),
      create_block(3, 2, 2, 0)
    ];
  }

  // Finally, shuffle each block except for the first one
  return _.map(blocks, (block, i) => {
    if (i == 0) {
      return block;
    }
    return _.shuffle(block);
  });
}

// Keeps a singleton list of blocks so that we don't recompute each time
export function create_blocks_singleton(c25, c50, c75) {
  if (_.isUndefined(create_blocks_singleton.blocks)) {
    if (arguments.length == 3) {
      create_blocks_singleton.blocks = create_blocks(c25, c50, c75);
    } else {
      const data = getProcessedData();

      // If we have quest data from our store, use that as a fallback
      if (!_.isUndefined(data)) {

        const c25 = data.intensities.c25;
        const c50 = data.intensities.c50;
        const c75 = data.intensities.c75;

        create_blocks_singleton.blocks = create_blocks(c25, c50, c75);
      }
    }
  }
  return create_blocks_singleton.blocks;
}
