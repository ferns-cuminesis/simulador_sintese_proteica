function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class DNAUtils {

















































































  static codonToAminoAcid(codon) {
    return this._codonToAminoAcidLookup[codon.join('')];
  }

  static codonToRGB(codon) {
    return codon.map(nucleotide => this._nucleotideToNumberLookup[nucleotide]);
  }

  static chunkDnaIntoCodons(dna) {
    // would use lodash chunk in real life
    return dna.reduce((a, b, c) => {
      if (c % 3 == 0 && c !== 0) {
        a.push([]);
      };
      a[a.length - 1].push(b);
      return a;
    }, [[]]).
    filter(function (codon) {
      return codon.length === 3;
    });
  }

  static transcribeSingleNucleotide(nucleotide) {
    return this._transcriptionLookup[nucleotide];
  }

  static transcribeAllNucleotides(nucleotides) {
    return nucleotides.map(nucleotide => this.transcribeSingleNucleotide(nucleotide));
  }}_defineProperty(DNAUtils, "_transcriptionLookup", { 'a': 'u', 't': 'a', 'c': 'g', 'g': 'c' });_defineProperty(DNAUtils, "_nucleotideToNumberLookup", { 'a': 60, 'c': 120, 'u': 180, 'g': 240 });_defineProperty(DNAUtils, "_codonToAminoAcidLookup", { 'uuu': 'Fenilalanina', 'uuc': 'Fenilalanina', 'uua': 'Leucina', 'uug': 'Leucina', 'cuu': 'Leucina', 'cuc': 'Leucina', 'cua': 'Leucina', 'cug': 'Leucina', 'auu': 'Isolecina', 'auc': 'Isolecina', 'aua': 'Isolecina', 'aug': 'Metionina', 'guu': 'Valina', 'guc': 'Valina', 'gua': 'Valina', 'gug': 'Valina', 'ucu': 'Serina', 'ucc': 'Serina', 'uca': 'Serina', 'ucg': 'Serina', 'ccu': 'Prolina', 'ccc': 'Prolina', 'cca': 'Prolina', 'ccg': 'Prolina', 'acu': 'Treonina', 'acc': 'Treonina', 'aca': 'Treonina', 'acg': 'Treonina', 'gcu': 'Alanina', 'gcc': 'Alanina', 'gca': 'Alanina', 'gcg': 'Alanina', 'uau': 'Tirosina', 'uac': 'Tirosina', 'uaa': 'Códon de Parada', 'uag': 'Códon de Parada', 'cau': 'Histidina', 'cac': 'Histidina', 'caa': 'Glutamina', 'cag': 'Glutamina', 'aau': 'Asparagina', 'aac': 'Asparagina', 'aaa': 'Lisina', 'aag': 'Lisina', 'gau': 'Ácido Aspártico', 'gac': 'Ácido Aspártico', 'gaa': 'Ácido Glutâmico', 'gag': 'Ácido Glutâmico', 'ugu': 'Cisteina', 'ugc': 'Cisteina', 'uga': 'Códon de Parada', 'ugg': 'Triptofano', 'cgu': 'Arginina', 'cgc': 'Arginina', 'cga': 'Arginina', 'cgg': 'Arginina', 'agu': 'Serina', 'agc': 'Serina', 'aga': 'Arginina', 'agg': 'Arginina', 'ggu': 'Glicina', 'ggc': 'Glicina', 'gga': 'Glicina', 'ggg': 'Glicina' });


class StyleUtil {
  static darkenRgb(rgb, value) {
    if (!Array.isArray(rgb) || !Number.isInteger(value)) return;

    return rgb.map(color => color -= value);
  }

  static rgbArrayToCssString(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  static circleGradient(fromColor, toColor, size) {
    return `radial-gradient(circle at ${size} ${size}, ${fromColor}, ${toColor})`;
  }}


class MutationSimulator extends React.Component {
  constructor(props) {
    super(props);
    const { dna } = props;

    this.state = {
      dna,
      rna: DNAUtils.transcribeAllNucleotides(dna) };

  }

  render() {
    const rna = DNAUtils.transcribeAllNucleotides(this.state.dna);
    const aminoAcids = DNAUtils.chunkDnaIntoCodons(rna).
    map((codon, i) => {
      return /*#__PURE__*/(
        React.createElement("li", { key: `aminoAcid${i}` }, /*#__PURE__*/
        React.createElement(AminoAcid, { codon: codon })));


    });

    return /*#__PURE__*/(
      React.createElement("div", { className: "diagram" }, /*#__PURE__*/
      React.createElement("div", { className: "container--inner dna-container" }, /*#__PURE__*/
      React.createElement("h2", null, "DNA"), /*#__PURE__*/
      React.createElement(Strand, {
        callback: this.updateNucleotides.bind(this),
        canDrag: true,
        className: "dna",
        nucleotides: this.state.dna })), /*#__PURE__*/

      React.createElement("div", { className: "container--inner rna-container" }, /*#__PURE__*/
      React.createElement("h2", null, "mRNA"), /*#__PURE__*/
      React.createElement(Strand, {
        canDrag: false,
        className: "rna",
        nucleotides: this.state.rna })), /*#__PURE__*/

      React.createElement("div", { className: "container--inner amino-acid-container" }, /*#__PURE__*/
      React.createElement("h2", null, "Amino\xE1cidos"), /*#__PURE__*/
      React.createElement("ul", { className: "amino-acid-list" },
      aminoAcids))));




  }

  updateNucleotides(nucleotides) {
    this.setState({
      dna: nucleotides,
      rna: DNAUtils.transcribeAllNucleotides(nucleotides) });

  }}


class Strand extends React.Component {
  constructor(props) {
    super(props);

    this.dragged = null;
    this.placeholder = document.createElement('li');
    this.placeholder.classList.add('placeholder');
    this.state = { activeDragging: false };
  }

  _dragEnd(evt) {
    this.setState({ activeDragging: false });
    this.dragged.style.display = 'block';

    try {
      this.dragged.parentNode.removeChild(this.placeholder);
    } catch (e) {
      // do nothing if dropped outside target area
    }

    const data = this.props.nucleotides;
    const from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);

    if (from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.props.callback(data);
  }

  _dragOver(evt) {
    if (evt.target.classList.contains('dna-nucleotide')) {
      evt.preventDefault();
      try {
        this.dragged.style.display = 'none';
      } catch (e) {
        // do nothing if dragged outside target area
      }
      if (evt.target.className === 'placeholder') {
        return;
      }
      this.over = evt.target;
      evt.target.parentNode.insertBefore(this.placeholder, evt.target);
    }
  }

  _dragStart(evt) {
    this.setState({ activeDragging: true });
    this.dragged = evt.currentTarget;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/html', this.dragged);
  }

  render() {
    let activeClass = '';
    let dragAttributes = {};
    let nucleotides;

    if (this.props.canDrag) {
      dragAttributes = {
        draggable: true,
        onDragEnd: this._dragEnd.bind(this),
        onDragStart: this._dragStart.bind(this) };

    }

    if (this.state.activeDragging) {
      activeClass = 'active-strand';
    }

    nucleotides = this.props.nucleotides.map((nucleotide, i) => {
      return /*#__PURE__*/(
        React.createElement(Nucleotide, {
          baseClassName: this.props.className,
          canDrag: this.props.canDrag,
          dragAttributes: dragAttributes,
          index: i,
          key: `${this.props.className}-nucleotide-${i}`,
          nucleotide: nucleotide }));


    });

    return /*#__PURE__*/(
      React.createElement("ul", {
        className: `${this.props.className} ${activeClass}`,
        onDragOver: this._dragOver.bind(this) },
      nucleotides));


  }}


Strand.propTypes = {
  callback: React.PropTypes.func,
  canDrag: React.PropTypes.bool,
  className: React.PropTypes.string.isRequired,
  nucleotides: React.PropTypes.array.isRequired };

Strand.defaultProps = {
  canDrag: false };


class Nucleotide extends React.Component {
  render() {
    const { baseClassName, canDrag, dragAttributes, index, nucleotide } = this.props;
    return /*#__PURE__*/(
      React.createElement("li", _extends({
        className: `${baseClassName}-nucleotide`,
        "data-id": index,
        key: `${baseClassName}${nucleotide}${index}` },
      dragAttributes), /*#__PURE__*/
      React.createElement("div", { className: `nucleotide ${canDrag ? 'nucleotide--draggable' : ''} ${nucleotide}` }, "                     ", nucleotide)));



  }}


Nucleotide.propTypes = {
  canDrag: React.PropTypes.bool,
  baseClassName: React.PropTypes.string,
  dragAttributes: React.PropTypes.object,
  index: React.PropTypes.number,
  nucleotide: React.PropTypes.string };


class AminoAcid extends React.Component {
  getBackgroundColor(codon) {
    const codonRgb = DNAUtils.codonToRGB(codon);
    const darkenedRgb = StyleUtil.darkenRgb(codonRgb, 60);
    const colorString = StyleUtil.rgbArrayToCssString(codonRgb);
    const darkenedColorString = StyleUtil.rgbArrayToCssString(darkenedRgb);

    return StyleUtil.circleGradient(colorString, darkenedColorString, '2em');
  }

  render() {
    const styles = { background: this.getBackgroundColor(this.props.codon) };
    const aminoAcidName = DNAUtils.codonToAminoAcid(this.props.codon) || 'Other';

    return /*#__PURE__*/(
      React.createElement("div", { className: "amino-acid", style: styles },
      aminoAcidName));


  }}


AminoAcid.propTypes = {
  codon: React.PropTypes.array.isRequired };


ReactDOM.render( /*#__PURE__*/
React.createElement(MutationSimulator, { dna: ['a', 'c', 'g', 't', 'a',
  'c', 't', 'g', 'g', 'c', 'c'] }),
document.getElementById('app'));


teste1 = confirm("Este jogo foi traduzido e adapatado por Fernanda Cuminesi para a disciplina de Práticas em Docência.");

Nome = prompt('Vamos inventar uma proteína totalmente nova? Primeiro, escolha um nome legal para ela!');
tagh1.innerHTML = "Nome: " + Nome;