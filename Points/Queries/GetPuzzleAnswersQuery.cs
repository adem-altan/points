using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Points.Queries
{
    public class GetPuzzleAnswersQuery
    {
        public int N { get; }
        public int Iterations { get; }
        public int GridSize { get; }
        public int Radius { get; }

        public GetPuzzleAnswersQuery(int n, int iterations, int gridSize, int radius)
        {
            N = n;
            Iterations = iterations;
            GridSize = gridSize;
            Radius = radius;
        }
    }
}
