import openai from './openaiClient';

/**
 * "Гидра" (Hydra) - Search Agent
 * Monitors specified sources for keywords and collects relevant content
 */
export class HydraAgent {
  /**
   * Performs semantic keyword expansion for better search accuracy
   * @param {string[]} keywords - Original keywords
   * @returns {Promise<string[]>} Expanded keywords
   */
  async expandKeywords(keywords) {
    try {
      const response = await openai?.chat?.completions?.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a search optimization assistant. Expand the given keywords with semantic variations, synonyms, and related terms. Return only a JSON array of strings.'
          },
          {
            role: 'user',
            content: `Expand these keywords for news search: ${keywords?.join(', ')}`
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'keyword_expansion',
            schema: {
              type: 'object',
              properties: {
                expandedKeywords: {
                  type: 'array',
                  items: { type: 'string' }
                }
              },
              required: ['expandedKeywords'],
              additionalProperties: false
            }
          }
        }
      });

      const result = JSON.parse(response?.choices?.[0]?.message?.content);
      return result?.expandedKeywords || keywords;
    } catch (error) {
      console.error('Error expanding keywords:', error);
      return keywords;
    }
  }

  /**
   * Checks content relevance against keywords
   * @param {string} content - Article content
   * @param {string[]} keywords - Keywords to match
   * @returns {Promise<number>} Relevance score (0-1)
   */
  async checkRelevance(content, keywords) {
    try {
      const response = await openai?.chat?.completions?.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Analyze content relevance to keywords. Return a relevance score from 0 to 1.'
          },
          {
            role: 'user',
            content: `Content: "${content?.slice(0, 500)}..."\nKeywords: ${keywords?.join(', ')}\nScore the relevance.`
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'relevance_score',
            schema: {
              type: 'object',
              properties: {
                relevanceScore: { type: 'number' },
                reasoning: { type: 'string' }
              },
              required: ['relevanceScore', 'reasoning'],
              additionalProperties: false
            }
          }
        }
      });

      const result = JSON.parse(response?.choices?.[0]?.message?.content);
      return result?.relevanceScore || 0;
    } catch (error) {
      console.error('Error checking relevance:', error);
      return 0;
    }
  }
}

/**
 * "Оракул" (Oracle) - Analytical Agent  
 * Analyzes, summarizes and determines content sentiment
 */
export class OracleAgent {
  /**
   * Creates article summaries with configurable depth
   * @param {string} content - Article content
   * @param {string} depth - 'brief', 'medium', or 'detailed'
   * @returns {Promise<string>} Article summary
   */
  async summarizeArticle(content, depth = 'medium') {
    const depthInstructions = {
      brief: '2-3 sentences',
      medium: '5-7 sentences', 
      detailed: '1 paragraph'
    };

    try {
      const response = await openai?.chat?.completions?.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a news summarization expert. Create a ${depthInstructions?.[depth]} summary of the provided article. Focus on the main facts, key events, and important details.`
          },
          {
            role: 'user',
            content: content
          }
        ]
      });

      return response?.choices?.[0]?.message?.content;
    } catch (error) {
      console.error('Error summarizing article:', error);
      return 'Summary not available';
    }
  }

  /**
   * Performs sentiment analysis on content
   * @param {string} content - Article content
   * @returns {Promise<object>} Sentiment analysis result
   */
  async analyzeSentiment(content) {
    try {
      const response = await openai?.chat?.completions?.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Analyze the emotional tone and sentiment of the provided text. Classify as positive, negative, neutral, or scientific. Provide confidence score.'
          },
          {
            role: 'user',
            content: content
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'sentiment_analysis',
            schema: {
              type: 'object',
              properties: {
                sentiment: { 
                  type: 'string',
                  enum: ['positive', 'negative', 'neutral', 'scientific']
                },
                confidence: { type: 'number' },
                reasoning: { type: 'string' }
              },
              required: ['sentiment', 'confidence', 'reasoning'],
              additionalProperties: false
            }
          }
        }
      });

      return JSON.parse(response?.choices?.[0]?.message?.content);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return { sentiment: 'neutral', confidence: 0, reasoning: 'Analysis failed' };
    }
  }

  /**
   * Performs deep semantic analysis for article insights
   * @param {string} content - Article content
   * @returns {Promise<object>} Deep analysis results
   */
  async performDeepAnalysis(content) {
    try {
      const response = await openai?.chat?.completions?.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Perform comprehensive semantic analysis. Extract entities, key facts, identify tone/modality, and provide insights.'
          },
          {
            role: 'user',
            content: content
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'deep_analysis',
            schema: {
              type: 'object',
              properties: {
                entities: {
                  type: 'object',
                  properties: {
                    persons: { type: 'array', items: { type: 'string' } },
                    organizations: { type: 'array', items: { type: 'string' } },
                    locations: { type: 'array', items: { type: 'string' } }
                  }
                },
                keyFacts: { type: 'array', items: { type: 'string' } },
                tone: { type: 'string' },
                modality: { type: 'string' },
                mainTopics: { type: 'array', items: { type: 'string' } }
              },
              required: ['entities', 'keyFacts', 'tone', 'modality', 'mainTopics'],
              additionalProperties: false
            }
          }
        }
      });

      return JSON.parse(response?.choices?.[0]?.message?.content);
    } catch (error) {
      console.error('Error performing deep analysis:', error);
      return {
        entities: { persons: [], organizations: [], locations: [] },
        keyFacts: [],
        tone: 'neutral',
        modality: 'uncertain',
        mainTopics: []
      };
    }
  }

  /**
   * Detects duplicate content using semantic similarity
   * @param {string} content1 - First content
   * @param {string} content2 - Second content  
   * @returns {Promise<number>} Similarity score (0-1)
   */
  async detectDuplicates(content1, content2) {
    try {
      // Generate embeddings for both contents
      const embedding1Response = await openai?.embeddings?.create({
        model: 'text-embedding-3-small',
        input: content1?.slice(0, 8000) // Limit input size
      });

      const embedding2Response = await openai?.embeddings?.create({
        model: 'text-embedding-3-small', 
        input: content2?.slice(0, 8000)
      });

      const embedding1 = embedding1Response?.data?.[0]?.embedding;
      const embedding2 = embedding2Response?.data?.[0]?.embedding;

      // Calculate cosine similarity
      const similarity = this.calculateCosineSimilarity(embedding1, embedding2);
      return similarity;
    } catch (error) {
      console.error('Error detecting duplicates:', error);
      return 0;
    }
  }

  /**
   * Helper function to calculate cosine similarity between two vectors
   * @param {number[]} vecA - First vector
   * @param {number[]} vecB - Second vector
   * @returns {number} Cosine similarity score
   */
  calculateCosineSimilarity(vecA, vecB) {
    const dotProduct = vecA?.reduce((sum, a, idx) => sum + a * vecB?.[idx], 0);
    const magnitudeA = Math.sqrt(vecA?.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB?.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

// Export singleton instances
export const hydraAgent = new HydraAgent();
export const oracleAgent = new OracleAgent();