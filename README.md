# TWONy (micro) - an OSN Simulation

A micro-simulation of the impact of social network mechanics on the sentiment of online discourse. This interactive demonstration shows how social media algorithms affect online conversations by simulating virtual agents creating posts and replies while different ranking systems influence content visibility.

### Overview

TWONy-micro is an educational tool that visualizes how algorithmic choices shape the tone and direction of online discourse. Users can:

- **Watch virtual agents interact** in a simulated social media environment
- **Experiment with different ranking algorithms** (chronological vs. sentiment-based)
- **Customize agent personas** with unique personalities and communication styles
- **Analyze conversation patterns** through real-time sentiment analysis
- **Participate in conversations** by posting their own messages

### Features

#### LLM-Powered Agents
- Multiple configurable personas with distinct personalities
- Realistic post and reply generation using Hugging Face language models
- Customizable instructions for agent behavior

#### Sentiment Analysis
- Real-time sentiment classification of all posts and replies
- Visual indicators for positive and negative emotional content
- Network-wide sentiment tracking over time

#### Algorithm Comparison
- **Chronological ranking**: Traditional timeline ordering
- **Sentiment-based ranking**: Promotes emotionally charged content
- Adjustable sentiment weights to fine-tune algorithmic behavior

#### Data Visualization
- Live charts showing sentiment trends across the network
- Per-user sentiment analysis
- Thread-level emotional impact scoring

#### Data Management
- Export simulation results and settings
- Import/export agent configurations
- Session state persistence in browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/simon-muenker/TWONy-micro.git
   cd TWONy-micro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `localhost:4321/TWONy-micro`

5. Enter your Hugging Face API key in the Introduction page

## Usage

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run prettier`        | Format code with Prettier                        |
| `npm run eslint`          | Lint code and fix issues   

## Privacy & Data

- **All processing happens in your browser** - no data is sent to external servers (except API calls to Hugging Face)
- **API keys are stored locally** in your browser only
- **No user tracking or analytics** are implemented
- **Simulation data can be exported** for further analysis

## Citation

If you use TWONy-micro in your research or educational activities, please cite the accompanying academic paper:

```bibtex
@inproceedings{munker2025twony,
  title={twony: A Micro-Simulation of the Impact of OSN Mechanics on the Emotionality of Online Discourse},
  author={M{\"u}nker, Simon and Rettinger, Achim},
  booktitle={Joint Proceedings of the ESWC 2025 Workshops and Tutorials co-located with 22nd Extended Semantic Web Conference (ESWC 2025)}
  year={2025}
}
```

## Relevant Sources

- **Frontend**: Astro.js with Svelte components
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **LLMs**: Hugging Face Inference API
- **State Management**: Nanostores with persistent storage
- **Sentiment Analysis**: cardiffnlp/twitter-xlm-roberta-base-sentiment

---

*This work is supported by TWON (project number 101095095), a research project funded by the European Union under the Horizon framework (HORIZON-CL2-022-DEMOCRACY-01-07).*