using Points.Controllers;
using Xunit;
using FluentAssertions;

namespace Tests
{
    public class PointsTests
    {
        [Fact]
        public void ArraySizeMustBeEqualToGivenN()
        {
            var givenN = 50;
            var testArray = PointsController.GeneratePoints(givenN, 100);

            testArray.Length.Should().Be(givenN);
        }

        [Fact]
        public void GivenPointMustBeWithinCircle()
        {
            var isInCircle = PointsController.IsGivenPointWithinCircle(5, 10);

            isInCircle.Should().BeTrue();
        }
    }
}