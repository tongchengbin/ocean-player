<template>
  <div class="competition-container">
    <div class="competition-header">
      <h1>赛事中心</h1>
    </div>
    
    <div class="competition-types">
      <button 
        v-for="type in types" 
        :key="type.value"
        class="type-button"
        :class="{ active: currentType === type.value }"
        @click="setType(type.value)"
      >
        {{ type.label }}
      </button>
    </div>

    <Transition-group 
      name="slide-fade"
      tag="div"
      class="challenge-grid"
    >
      <div 
        v-for="challenge in filteredChallenges" 
        :key="challenge.id"
        class="challenge-card"
      >
        <h3 class="challenge-title">{{ challenge.title }}</h3>
        <div class="challenge-type">{{ getTypeLabel(challenge.type) }}</div>
        
        <div class="challenge-stats">
          <div class="challenge-stat">
            <el-icon><User /></el-icon>
            {{ challenge.solvedCount }} 人已解决
          </div>
          <div class="challenge-stat">
            <el-icon><Star /></el-icon>
            {{ challenge.points }} 分
          </div>
        </div>

        <div class="challenge-medals">
          <el-icon v-if="challenge.medals.gold" class="medal medal-gold"><Trophy /></el-icon>
          <el-icon v-if="challenge.medals.silver" class="medal medal-silver"><Trophy /></el-icon>
          <el-icon v-if="challenge.medals.bronze" class="medal medal-bronze"><Trophy /></el-icon>
        </div>
      </div>
    </Transition-group>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { User, Star, Trophy } from '@element-plus/icons-vue'

export default {
  name: 'Competition',
  components: {
    User,
    Star,
    Trophy
  },
  setup() {
    const types = [
      { label: '全部', value: 'all' },
      { label: 'Web', value: 'web' },
      { label: 'Crypto', value: 'crypto' },
      { label: 'Pwn', value: 'pwn' },
      { label: 'IoT', value: 'iot' },
      { label: 'Misc', value: 'misc' },
      { label: 'Reverse', value: 'reverse' }
    ]

    const currentType = ref('all')
    const challenges = ref([
      {
        id: 1,
        title: 'Test Challenge',
        type: 'web',
        solvedCount: 0,
        points: 1,
        medals: {
          gold: true,
          silver: true,
          bronze: true
        }
      },
      // Add more challenges here
    ])

    const filteredChallenges = computed(() => {
      if (currentType.value === 'all') {
        return challenges.value
      }
      return challenges.value.filter(c => c.type === currentType.value)
    })

    const setType = (type) => {
      currentType.value = type
    }

    const getTypeLabel = (type) => {
      const found = types.find(t => t.value === type)
      return found ? found.label : type
    }

    return {
      types,
      currentType,
      challenges,
      filteredChallenges,
      setType,
      getTypeLabel
    }
  }
}
</script>

<style scoped>
/* Styles are in global CSS file */
</style>
