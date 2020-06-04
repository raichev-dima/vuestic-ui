import { BlockType, ApiDocsBlock } from '../../../types/configTypes'
import VaContext from 'vuestic-ui/src/components/vuestic-components/va-context/VaContext.vue'
import apiOptions from './api-options'

export default [
  {
    type: BlockType.TITLE,
    translationString: 'context.title',
  },
  {
    type: BlockType.API,
    componentOptions: VaContext,
    apiOptions,
  },
] as ApiDocsBlock[]
