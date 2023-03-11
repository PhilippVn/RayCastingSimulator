function config() {
    const raySpacingSlider = document.getElementById("ray-spacing");
    const boundaryWidthSlider = document.getElementById("boundary-width");
    const rayWidthSlider = document.getElementById("ray-width");
    const playerSizeSlider = document.getElementById("player-size");
    const resetButton = document.getElementById("reset-button");

  
    boundaryWidthSlider.oninput = function () {
      boundaryWidth = parseInt(this.value);
      updateOutputValue('boundary-width', 'boundary-width-value');
    }
  
    rayWidthSlider.oninput = function () {
      rayWidth = parseInt(this.value);
      updateOutputValue('ray-width', 'ray-width-value');
    }
  
    raySpacingSlider.oninput = function () {
      rayStepSize = parseInt(this.value);
      updateOutputValue('ray-spacing', 'ray-spacing-value');
    }
  
    playerSizeSlider.oninput = function () {
      playerRadius = parseInt(this.value);
      updateOutputValue('player-size', 'player-size-value');
    }
  
    resetButton.onclick = function () {
      boundaryWidth = 10;
      rayWidth = 1;
      rayStepSize = 10;
      playerRadius = 13;
  
      boundaryWidthSlider.value = 10;
      rayWidthSlider.value = 1;
      raySpacingSlider.value = 10;
      playerSizeSlider.value = 13;
    }
  };

  function updateOutputValue(sliderId, outputId) {
    const slider = document.getElementById(sliderId);
    const output = document.getElementById(outputId);
    output.textContent = slider.value;
}