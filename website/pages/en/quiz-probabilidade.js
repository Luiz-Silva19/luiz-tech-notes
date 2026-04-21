const React = require("react");
const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;

const QUESTIONS = [
  {
    id: 1,
    prompt: "Em probabilidade clássica equiprovável, a fórmula correta é:",
    options: [
      "P(A) = casos possíveis / casos favoráveis",
      "P(A) = casos favoráveis / casos possíveis",
      "P(A) = 1 / n!",
      "P(A) = n / p",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    prompt:
      "Qual técnica usar quando a ordem importa e usamos apenas parte dos elementos?",
    options: ["Permutação", "Combinação", "Arranjo", "Média aritmética"],
    correctIndex: 2,
  },
  {
    id: 3,
    prompt:
      "Qual técnica usar quando a ordem NÃO importa e escolhemos p elementos entre n?",
    options: ["Combinação", "Arranjo", "Permutação", "Regra de três"],
    correctIndex: 0,
  },
  {
    id: 4,
    prompt: "A notação P(A|B) representa:",
    options: [
      "Probabilidade de B dado A",
      "Probabilidade conjunta de A e B",
      "Probabilidade de A dado B",
      "Probabilidade total de A e B",
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    prompt: "Qual expressão representa a Regra do Produto (forma geral)?",
    options: [
      "P(A ∩ B) = P(A) + P(B)",
      "P(A ∩ B) = P(A) · P(B|A)",
      "P(A|B) = P(A) · P(B)",
      "P(A) = P(B) / P(A ∩ B)",
    ],
    correctIndex: 1,
  },
  {
    id: 6,
    prompt: "Se A e B são independentes, então:",
    options: [
      "P(A ∩ B) = P(A) + P(B)",
      "P(A|B) = P(B|A)",
      "P(A ∩ B) = P(A) · P(B)",
      "P(A) = 1 - P(B)",
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    prompt: "Na probabilidade condicional, é obrigatório que:",
    options: ["P(B) < 0", "P(B) = 0", "P(B) > 0", "P(B) = 1 sempre"],
    correctIndex: 2,
  },
  {
    id: 8,
    prompt: "Qual é um erro comum em análise combinatória?",
    options: [
      "Usar combinação quando a ordem importa",
      "Usar frações em probabilidades",
      "Contar casos favoráveis",
      "Separar evento e espaço amostral",
    ],
    correctIndex: 0,
  },
  {
    id: 9,
    prompt:
      "Se uma urna tem 3 azuis e 2 vermelhas, sem reposição, a chance de azul e depois azul é:",
    options: ["3/5 · 2/4", "3/5 + 2/4", "2/5 · 1/4", "1/5 · 1/4"],
    correctIndex: 0,
  },
  {
    id: 10,
    prompt:
      "Ao escolher 3 pessoas para um comitê entre 10, a técnica adequada é:",
    options: ["Arranjo", "Permutação", "Combinação", "Condicional"],
    correctIndex: 2,
  },
];

class QuizProbabilidade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      submitted: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSelect(questionId, optionIndex) {
    this.setState(function (prev) {
      const nextAnswers = Object.assign({}, prev.answers, {
        [questionId]: optionIndex,
      });
      return { answers: nextAnswers };
    });
  }

  handleSubmit(event) {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    this.setState({ submitted: true });
  }

  handleReset(event) {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    this.setState({ answers: {}, submitted: false });
  }

  getScore() {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (this.state.answers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  }

  renderQuestion(q) {
    const selected = this.state.answers[q.id];
    const showResult = this.state.submitted;

    return (
      <div
        key={q.id}
        style={{
          marginBottom: 24,
          padding: 16,
          border: "1px solid #e3e3e3",
          borderRadius: 8,
        }}
      >
        <p style={{ marginBottom: 10, fontWeight: 600 }}>
          {q.id}. {q.prompt}
        </p>

        {q.options.map((opt, idx) => {
          const isChecked = selected === idx;
          const isCorrect = idx === q.correctIndex;
          const isWrongSelected = showResult && isChecked && !isCorrect;
          const isRightSelected = showResult && isChecked && isCorrect;

          let labelColor = "#222";
          if (isWrongSelected) labelColor = "#b00020";
          if (isRightSelected) labelColor = "#0b6b2f";

          return (
            <label
              key={idx}
              style={{ display: "block", marginBottom: 8, color: labelColor }}
            >
              <input
                type="radio"
                name={`question-${q.id}`}
                value={idx}
                checked={isChecked}
                onChange={() => this.handleSelect(q.id, idx)}
                disabled={showResult}
                style={{ marginRight: 8 }}
              />
              {opt}
            </label>
          );
        })}

        {showResult && (
          <p style={{ marginTop: 8, fontSize: 14, color: "#555" }}>
            Resposta correta: <strong>{q.options[q.correctIndex]}</strong>
          </p>
        )}
      </div>
    );
  }

  render() {
    const { config: siteConfig } = this.props;
    const { baseUrl } = siteConfig;

    const answeredCount = Object.keys(this.state.answers).length;
    const total = QUESTIONS.length;
    const score = this.getScore();
    const percent = Math.round((score / total) * 100);

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h1>Teste de Fixação: Probabilidade</h1>
            </header>

            <p>
              Responda às perguntas abaixo e clique em{" "}
              <strong>Finalizar Teste</strong> para ver seu resultado.
            </p>

            <p>
              Progresso: <strong>{answeredCount}</strong> de{" "}
              <strong>{total}</strong> perguntas respondidas.
            </p>

            <div style={{ marginTop: 20 }}>
              {QUESTIONS.map((q) => this.renderQuestion(q))}
            </div>

            {!this.state.submitted ? (
              <button
                type="button"
                onClick={this.handleSubmit}
                style={{
                  marginRight: 12,
                  background: "#a2025a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
              >
                Finalizar Teste
              </button>
            ) : (
              <div
                style={{
                  marginTop: 16,
                  marginBottom: 12,
                  padding: 12,
                  background: "#f8f3f6",
                  borderRadius: 8,
                }}
              >
                <p style={{ margin: 0 }}>
                  Resultado final: <strong>{score}</strong> acertos de{" "}
                  <strong>{total}</strong> ({percent}%).
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={this.handleReset}
              style={{
                marginTop: 8,
                background: "#fff",
                color: "#a2025a",
                border: "1px solid #a2025a",
                borderRadius: 6,
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              Tentar Novamente
            </button>

            <p style={{ marginTop: 24 }}>
              Voltar para conteúdo:{" "}
              <a
                href={`${baseUrl}docs/statistics/probabilidade/probabilidade-classica`}
              >
                Probabilidade Clássica
              </a>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = QuizProbabilidade;
