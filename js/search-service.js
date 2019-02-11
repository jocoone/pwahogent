function createLabelWithValue(label, value) {
  var nameContainer = document.createElement('div');
  var nameSpan = document.createElement('span');
  var nameLabel = document.createElement('strong');
  nameSpan.textContent = value;
  nameLabel.appendChild(document.createTextNode(label));
  nameContainer.appendChild(nameLabel);
  nameContainer.appendChild(nameSpan);
  return nameContainer;
}

function mapToResultItem(item) {
  var element = document.createElement('div');
  element.classList = 'result-item';
  element.appendChild(createLabelWithValue('Name: ', item.name));
  element.appendChild(createLabelWithValue('Height: ', item.height));
  element.appendChild(createLabelWithValue('Color: ', item['skin_color']));
  return element;
}

window.addEventListener('load', function() {
  var searchBtn = document.getElementById('search-button');

  searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var searchValue = document.getElementById('search').value;
    var resultsContainer = document.getElementById('results');
    if (searchValue && searchValue !== '') {
      fetch('https://swapi.co/api/people/?search=' + searchValue).then(function(response) {
        document.getElementById('app').classList = 'searched';
        response.json().then(function(data) {
          resultsContainer.innerHTML = '';
          data.results.map(mapToResultItem).forEach(result => resultsContainer.appendChild(result));
        });
      });
    }
  });
});
