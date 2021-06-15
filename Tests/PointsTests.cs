using Points.Controllers;
using Xunit;
using FluentAssertions;
using System;

namespace Tests
{
    public class PointsTests
    {
        [Fact]
        public void ArraySizeMustBeEqualToGivenN()
        {
            var givenN = new Random().Next(1, 1_000_000); ;
            var testArray = PointsController.GeneratePoints(givenN, 100);

            testArray.Length.Should().Be(givenN);
        }

        [Fact]
        public void GivenPointsMustBeWithinCircle()
        {
            // Diagonal length of a square is
            // Side (grid size) * sqrt of 2
            // which is the threshold when circle
            // occupies the entire box.
            // Hence random points should always be inside of
            // a circle with a diameter >= to the threshold
            // which is diagonalLength / 2

            var n = 1_000_000_000; //number of points to generate
            var gridSize = new Random().Next(100, 500);
            var diagonalLength = gridSize * Math.Sqrt(2);
            var radius = diagonalLength / 2;
            var xArray = PointsController.GeneratePoints(n, gridSize);
            var yArray = PointsController.GeneratePoints(n, gridSize);

            var numberOfPointsInsideTheCircle = 0;
            for(int i = 0; i < n; i++)
            {
                var distance = PointsController.FindDistance(xArray[i], yArray[i], gridSize/2);
                
                if(PointsController.IsGivenPointWithinCircle(distance, radius))
                {
                    numberOfPointsInsideTheCircle++;
                }
            }
            numberOfPointsInsideTheCircle.Should().Be(n);
        }

        [Fact]
        public void NotAllPointsMustBeWithinCircle()
        {
            var n = 1_000_000_000; //number of points to generate
            var gridSize = new Random().Next(100, 500);
            var radius = gridSize / 2;
            var xArray = PointsController.GeneratePoints(n, gridSize);
            var yArray = PointsController.GeneratePoints(n, gridSize);

            var numberOfPointsInsideTheCircle = 0;
            for (int i = 0; i < n; i++)
            {
                var distance = PointsController.FindDistance(xArray[i], yArray[i], gridSize / 2);
                if(PointsController.IsGivenPointWithinCircle(distance, radius))
                {
                    numberOfPointsInsideTheCircle++;
                }
            }

            numberOfPointsInsideTheCircle.Should().BeLessThan(n);
        }
    }
}