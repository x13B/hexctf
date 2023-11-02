<style>
nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    nav a {
        display: block;
    }

    nav li {
        padding-right: 5px;
        padding-left: 5px;
    }

    .nav-left ul li {
        float: left;
    }
</style>

<nav class="nav">
    <div class="nav-left">
        <ul>
            <li><a href="/admin/createCompetition">Create Competition</a></li>
            <li><a href="/admin/createQuestion">Create Question</a></li>
        </ul>
    </div>
</nav>

<slot />