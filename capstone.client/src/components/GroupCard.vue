<template>
    <!-- <router-link :to="{ name: 'GroupDetails', params: { id: group.id } }" class="selectable">
        <div class="row bg-light p-3 rounded elevation-5 mt-3">
            <div class="col-3">
                <img class="img-fluid" :src="group.coverImg" />
            </div>
            <div class="col-6">
                <h2>{{ group.groupName }}</h2>
                <p>{{ group.description }}</p>
                <p>Capacity: {{ group.capacity }}</p>
                <p>SkillLevel: {{ group.skillLevel }}</p>
            </div>
        </div>
    </router-link> -->
    <div class="card">
        <div class="imgBx">
            <img :src="group.coverImg">
        </div>
        <div class="contentBx">
            <h2 class="mt-2">{{ group.groupName }}</h2>
            <div class="size mt-3">
                <p>Capacity: {{ group.capacity }}</p>
                <p class="ms-3">SkillLevel: {{ group.skillLevel }}</p>
            </div>
            <router-link :to="{ name: 'GroupDetails', params: { id: group.id } }">
                <div class="row justify-content-center">
                    <div class="col-5  rounded">
                        <button class="btn btn-dark mt-3 text-white">See Details</button>
                    </div>
                </div>
            </router-link>
        </div>
    </div>

</template>


<script>
import { useRouter } from 'vue-router';

export default {
    props: {
        group: { type: Object, required: true }
    },
    setup() {
        const router = useRouter()
        return {}
    }
};
</script>


<style lang="scss" scoped>
.container .card {
    position: relative;
    height: 450px;
    background: rgba(59, 67, 113, 0.5215686275);
    border-radius: 20px;
    overflow: hidden;
}

.container .card:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(203, 207, 231, 0.926);
    clip-path: circle(150px at 80% 20%);
    transition: 0.5s ease-in-out;
}

.container .card:hover:before {
    clip-path: circle(300px at 80% -20%);
}


// .container .card:after {
//     content: 'Group';
//     position: absolute;
//     top: 30%;
//     left: -20%;
//     font-size: 12em;
//     font-weight: 800;
//     font-style: italic;
//     color: rgba(255, 255, 25, 0.05)
// }

.container .card .imgBx {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10000;
    width: 100%;
    height: 220px;
    transition: 0.5s;
}

.container .card:hover .imgBx {
    top: 0%;
    transform: translateY(0%);

}

.container .card .imgBx img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    width: 270px;
}

.container .card .contentBx {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    text-align: center;
    transition: 1s;
    z-index: 10;
}

.container .card:hover .contentBx {
    height: 210px;
}

.container .card .contentBx h2 {
    position: relative;
    font-weight: 600;
    letter-spacing: 1px;
    color: #fff;
}

.container .card .contentBx .size,
.container .card .contentBx .color {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    transition: 0.5s;
    opacity: 0;
    visibility: hidden;
    padding-top: 0;
    padding-bottom: 0;
    color: white;
}

.container .card:hover .contentBx .size {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.5s;
}

.container .card:hover .contentBx .color {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.6s;
}

.container .card .contentBx .size h3,
.container .card .contentBx .color h3 {
    color: #fff;
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: 10px;
}

.container .card .contentBx .size span {
    width: 26px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    display: inline-block;
    color: #111;
    background: #fff;
    margin: 0 5px;
    transition: 0.5s;
    color: #111;
    border-radius: 4px;
    cursor: pointer;
}

.container .card .contentBx .size span:hover {
    background: #9bdc28;
}

.container .card .contentBx .color span {
    width: 20px;
    height: 20px;
    background: #ff0;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
}
</style>