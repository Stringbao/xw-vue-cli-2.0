<template>
    <div class="main">
        <div class="sidebar">
            <ul>
                <li>
                    <router-link to="home">Home</router-link>
                </li>
                <li>
                    <router-link to="module">Module</router-link>
                </li>
                <li>
                    <router-link to="project">Project</router-link>
                </li>
            </ul>
        </div>
        <router-view class="content"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
.main {
    height: 100%;
    display: flex;
    .sidebar {
        width: 256px;
        background: #001529;
        ul {
            li {
                a {
                    display: block;
                    padding-left: 24px;
                    color: rgba(255, 255, 255, 0.65);
                    height: 40px;
                    line-height: 40px;
                    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
                a.router-link-active {
                    background-color: #1890ff;
                }
            }
        }
    }
    .content {
        flex: 1;
        background-color: #fff;
        padding: 42px 24px 50px;
        color: rgba(0, 0, 0, 0.85);
        border-bottom: 1px solid #f0f0f0;
    }
}
</style>